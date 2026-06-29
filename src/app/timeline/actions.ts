'use server';

import { Modality, Type } from "@google/genai";
import {
  dataUrlToInlineData,
  extractJson,
  friendlyGeminiError,
  getGeminiClient,
  getImageModel,
  getTextModel,
} from "../../lib/gemini.server";

export interface TimelineEra {
  year: number;
  title: string;
  description: string;
  appearance: string;
}

export interface IdentificationResult {
  name: string;
  location: string;
  confidence: number;
  summary: string;
}

export interface TimelineResult {
  name: string;
  builtYear: number;
  eras: TimelineEra[];
}

export async function identifyMonument(imageDataUrl: string, hint?: string): Promise<IdentificationResult> {
  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: getTextModel(),
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                "Identify the monument in this photo." +
                (hint ? ` Hint: it may be near ${hint}.` : ""),
            },
            { inlineData: dataUrlToInlineData(imageDataUrl) },
          ],
        },
      ],
      config: {
        systemInstruction:
          "You identify Indian monuments and landmarks from a photo. If you can't identify it, use name: \"Unknown\" and confidence: 0.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            location: { type: Type.STRING },
            confidence: { type: Type.NUMBER, description: "0 to 1" },
            summary: { type: Type.STRING },
          },
          required: ["name", "location", "confidence", "summary"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("Gemini returned an empty response");
    
    return extractJson<IdentificationResult>(text);
  } catch (e) {
    throw friendlyGeminiError(e);
  }
}

export async function getMonumentTimeline(name: string): Promise<TimelineResult> {
  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: getTextModel(),
      contents: `Monument: ${name}`,
      config: {
        systemInstruction:
          "You are a historian of Indian architecture. Provide 5-7 eras spanning from construction to today (2026), in ascending year order. Be historically accurate.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            builtYear: { type: Type.INTEGER },
            eras: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  year: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  description: {
                    type: Type.STRING,
                    description: "2-3 sentences",
                  },
                  appearance: {
                    type: Type.STRING,
                    description: "1 sentence describing visual state and surroundings then",
                  },
                },
                required: ["year", "title", "description", "appearance"],
              },
            },
          },
          required: ["name", "builtYear", "eras"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("Gemini returned an empty response");
    
    return extractJson<TimelineResult>(text);
  } catch (e) {
    throw friendlyGeminiError(e);
  }
}

export async function generateEraImage(name: string, year: number, appearance: string): Promise<{ dataUrl: string }> {
  const prompt = `Photorealistic depiction of the ${name} as it appeared in the year ${year}. ${appearance}. Show the monument and its immediate surroundings authentically for that era — period-appropriate people, clothing, vehicles, vegetation, and weathering. ${
    year < 1900
      ? "Style: detailed historical painting or early lithograph, slightly faded."
      : year < 1950
        ? "Style: vintage sepia photograph with grain."
        : year < 1990
          ? "Style: faded color film photograph from the era."
          : "Style: modern high-resolution photograph."
  } No text, no captions, no watermarks.`;

  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: getImageModel(),
      contents: prompt,
      config: {
        responseModalities: [Modality.IMAGE],
        imageConfig: { aspectRatio: "1:1" },
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p) => p.inlineData);
    const b64 = imagePart?.inlineData?.data;
    if (!b64) throw new Error("No image returned");
    const mimeType = imagePart?.inlineData?.mimeType ?? "image/png";
    
    return { dataUrl: `data:${mimeType};base64,${b64}` };
  } catch (e) {
    throw friendlyGeminiError(e);
  }
}