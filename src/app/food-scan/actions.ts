'use server';

import { GoogleGenAI, Type } from "@google/genai";

// Initialize the client. It automatically looks for process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface FoodAlternative {
  name: string;
  reason: string;
  benefits: string[];
  tripScore: number;
  whereToFind: string;
}

export interface FoodScanResult {
  productName: string;
  category: string;
  healthRating: number;
  travelRating: number;
  concerns: string[];
  alternatives: FoodAlternative[];
}

export async function scanFoodItem(imageDataUrl: string): Promise<FoodScanResult> {
  try {
    // 1. Remove data URL prefix safely to get the raw base64 string
    const base64Data = imageDataUrl.split(",")[1];
    if (!base64Data) {
      throw new Error("Invalid image source format.");
    }

    // 2. Query Gemini with multimodal input + structured JSON schema enforcement
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            { text: "Scan this packaged food item wrapper." },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Data,
              },
            },
          ],
        },
      ],
      config: {
        systemInstruction: 
          "You are a nutritionist for travellers in India. Given a photo of a packaged food/snack/drink, identify it and suggest healthier, travel-friendly alternatives that travel well (non-perishable, energy-rich, light, easy to carry, low-sugar where possible). Prefer Indian snacks like roasted chana, makhana, dry fruits, energy bars, bhuna chana, khakhra, theplas, coconut water, nimbu paani, ORS, etc. If you cannot identify the item, set productName to 'Unknown' and still suggest 4 general travel snack alternatives.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            productName: { type: Type.STRING },
            category: { type: Type.STRING, description: 'e.g. "Chips", "Instant Noodles", "Soft Drink", "Biscuits"' },
            healthRating: { type: Type.INTEGER, description: "Rating scale 0-10" },
            travelRating: { type: Type.INTEGER, description: "Rating scale 0-10" },
            concerns: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2 to 4 short bullet points about why it is not ideal for trips",
            },
            alternatives: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  reason: { type: Type.STRING, description: "One descriptive sentence max" },
                  benefits: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "2 to 3 short bullets describing benefits",
                  },
                  tripScore: { type: Type.INTEGER, description: "Rating scale 0-10" },
                  whereToFind: { type: Type.STRING, description: 'e.g. "Any kirana store", "Local market", "Pack from home"' },
                },
                required: ["name", "reason", "benefits", "tripScore", "whereToFind"],
              },
            },
          },
          required: ["productName", "category", "healthRating", "travelRating", "concerns", "alternatives"],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) throw new Error("Empty analysis outcome returned from model.");
    
    return JSON.parse(responseText) as FoodScanResult;
  } catch (err) {
    console.error("Gemini Scanning Error: ", err);
    throw new Error(err instanceof Error ? err.message : "Internal optimization scanner error.");
  }
}