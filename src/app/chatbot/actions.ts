'use server';

import { getGeminiClient, getTextModel, friendlyGeminiError } from "../../lib/gemini.server";

export interface ChatMsg {
  role: "user" | "assistant" | "system";
  content: string;
}

const SYSTEM_PROMPT =
  "You are Yatri, a warm and knowledgeable Indian tourism guide. You help travellers with questions about tourist places in India and abroad — their history, culture, best time to visit, how to reach, local cuisine and signature dishes, traditional dress, dance, festivals, packing tips for the destination (weather-appropriate clothing, gear, medicines, documents), travel safety, budget tips, and itinerary suggestions. Be specific, accurate, and friendly. Use short paragraphs and bullet lists when helpful. If a question is unrelated to travel, gently steer the user back to tourism topics. Format answers in markdown.";

/**
 * Server action to communicate with the Gemini API for the tourism chatbot
 */
export async function askTourismBot(messages: ChatMsg[]): Promise<{ reply: string }> {
  try {
    const ai = getGeminiClient();

    // Map the standard message format to what the @google/genai SDK expects
    const contents = messages
      .filter((m) => m.role !== "system")
      .map((m) => ({
        role: m.role === "assistant" ? ("model" as const) : ("user" as const),
        parts: [{ text: m.content }],
      }));

    const response = await ai.models.generateContent({
      model: getTextModel(),
      contents,
      config: { 
        systemInstruction: SYSTEM_PROMPT 
      },
    });

    return { reply: response.text ?? "" };
  } catch (err) {
    console.error("Gemini Chat Action Error: ", err);
    throw friendlyGeminiError(err);
  }
}