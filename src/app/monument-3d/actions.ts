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