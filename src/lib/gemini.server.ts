import { GoogleGenAI } from "@google/genai";
export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("API KEY:", process.env.GEMINI_API_KEY);

  if (!apiKey) {
    throw new Error(
      "Missing GEMINI_API_KEY. Add it to your .env file."
    );
  }

  return new GoogleGenAI({ apiKey });
}

export function getTextModel(): string {
  return process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash";
}

export function getImageModel(): string {
  return process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
}

export function dataUrlToInlineData(dataUrl: string): {
  mimeType: string;
  data: string;
} {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);

  if (!match) {
    throw new Error("Expected a base64 image data URL");
  }

  return {
    mimeType: match[1],
    data: match[2],
  };
}

export function extractJson<T>(raw: string): T {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();

  return JSON.parse(cleaned) as T;
}

export function friendlyGeminiError(e: unknown): Error {
  const msg = e instanceof Error ? e.message : String(e);

  if (/429|RESOURCE_EXHAUSTED/i.test(msg)) {
    return new Error("Rate limit reached. Please try again in a moment.");
  }

  if (/403|PERMISSION_DENIED/i.test(msg)) {
    return new Error(
      "Gemini API key was rejected. Check GEMINI_API_KEY."
    );
  }

  if (/503|UNAVAILABLE/i.test(msg)) {
    return new Error("Gemini is temporarily overloaded. Please try again.");
  }

  return e instanceof Error ? e : new Error(msg);
}