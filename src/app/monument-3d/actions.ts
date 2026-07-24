'use server';

import { friendlyGeminiError } from "../../lib/gemini.server";

export type CultureTopic =
  | "history"
  | "culture"
  | "cuisine"
  | "dance"
  | "dress"
  | "food"
  | "past";

export interface TopicData {
  title: string;
  body: string;
  narration: string;
  imageUrl: string;
  imageAlt: string;
}

export interface CultureInfo {
  monument: string;
  region: string;
  topics: Record<CultureTopic, TopicData>;
}

function extractJson<T>(raw: string): T {
  const cleaned = raw
    .trim()
    .replace(/```$/i, "")
    .trim();
  return JSON.parse(cleaned) as T;
}

/**
 * Gemini's TTS model returns raw 16-bit PCM audio (no container/header).
 * Wrap it in a minimal WAV header so it can be played directly by an
 * <audio> element — this matters a lot inside WebView-based apps (e.g.
 * Median), which generally have no native speechSynthesis/TTS engine but
 * play plain audio files just fine.
 */
function pcmToWavBase64(
  pcmBase64: string,
  sampleRate: number,
  numChannels = 1,
  bitsPerSample = 16
): string {
  const pcmBuffer = Buffer.from(pcmBase64, "base64");
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;

  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16); // PCM subchunk size
  header.writeUInt16LE(1, 20); // AudioFormat = PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]).toString("base64");
}

function parseSampleRate(mimeType: string | undefined): number {
  const match = mimeType?.match(/rate=(\d+)/);
  return match ? parseInt(match[1], 10) : 24000;
}

/**
 * Server action to synthesize narration audio for a piece of text using
 * Gemini's native TTS model, returning a playable "data:audio/wav" URI.
 *
 * This replaces the old approach of relying on the browser's
 * window.speechSynthesis, which does not work inside WebView-wrapped apps
 * (Median, GoNative, etc.) because those WebViews typically ship with no
 * TTS engine at all — speak() would silently do nothing there.
 */
export async function getNarrationAudio(text: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("Missing GEMINI_API_KEY inside environment variables.");
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Say the following warmly and clearly, as a friendly Indian female tour guide named Meera: ${text}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: "Leda" },
              },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini TTS status ${response.status}: ${await response.text()}`);
    }

    const j = await response.json() as {
      candidates: Array<{
        content: { parts: Array<{ inlineData?: { data: string; mimeType: string } }> };
      }>;
    };

    const inlineData = j.candidates?.[0]?.content?.parts?.[0]?.inlineData;
    if (!inlineData?.data) {
      throw new Error("No audio data returned from Gemini TTS.");
    }

    const sampleRate = parseSampleRate(inlineData.mimeType);
    const wavBase64 = pcmToWavBase64(inlineData.data, sampleRate);

    return `data:audio/wav;base64,${wavBase64}`;
  } catch (err) {
    console.error("Failed to generate narration audio:", err);
    throw friendlyGeminiError(err);
  }
}

/**
 * Server action to generate complete cultural information for a custom monument
 */
export async function getMonumentCulture(name: string): Promise<CultureInfo> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("Missing GEMINI_API_KEY inside environment variables.");
  }

  try {
    const prompt = `You are a warm Indian cultural guide named Meera. Given a monument name, provide rich details for each cultural category. 
    Return ONLY a single strict JSON object structure: 
    {
      "monument": string, 
      "region": string, 
      "topics": { 
        "history": {"title": string, "body": string (3-4 sentences), "narration": string (2-3 sentences, friendly spoken tone, first-person as a female guide Meera), "imageUrl": string, "imageAlt": string}, 
        "culture": {...}, 
        "cuisine": {...}, 
        "dance": {...}, 
        "dress": {...}, 
        "food": {...}, 
        "past": {...} 
      }
    }
    
    For the images, provide highly descriptive Unsplash image keywords (no spaces, e.g. "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80" style format keywords or direct, real Unsplash IDs if known).
    The 'cuisine' topic covers regional cooking traditions; 'food' covers signature dishes/snacks travellers should try; 'dress' covers traditional attire; 'dance' covers folk/classical dance styles of the region; 'past' covers stories/legends of the monument.
    
    Monument: ${name}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          }
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini Action status ${response.status}: ${await response.text()}`);
    }

    const j = await response.json() as {
      candidates: Array<{ content: { parts: Array<{ text: string }> } }>;
    };

    const raw = j.candidates[0]?.content?.parts[0]?.text ?? "";
    const parsedData = extractJson<CultureInfo>(raw);

    // Patch image URLs to ensure they load beautiful default photography from Unsplash
    const fallbackTerms = ["tajmahal", "jaipur", "monument", "temple", "india", "food", "dance"];
    Object.keys(parsedData.topics).forEach((key, idx) => {
      const topicKey = key as CultureTopic;
      if (!parsedData.topics[topicKey].imageUrl || !parsedData.topics[topicKey].imageUrl.startsWith("http")) {
        parsedData.topics[topicKey].imageUrl = `https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80&sig=${idx}`;
      }
    });

    return parsedData;
  } catch (err) {
    console.error("Failed to generate monument culture:", err);
    throw friendlyGeminiError(err);
  }
}