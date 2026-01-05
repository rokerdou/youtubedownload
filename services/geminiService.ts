import { GoogleGenAI, Type } from "@google/genai";
import { AiInsights } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateVideoInsights = async (videoTitle: string): Promise<AiInsights> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key missing");
  }

  const prompt = `
    Analyze the following YouTube video title: "${videoTitle}".
    1. Write a short, engaging 2-sentence summary of what this video is likely about.
    2. Generate 5 relevant SEO tags/hashtags.
    3. Determine the likely sentiment (positive, neutral, negative).
    4. Suggest a clean, SEO-friendly filename for downloading (kebab-case, no special chars).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            sentiment: { type: Type.STRING, enum: ["positive", "neutral", "negative"] },
            suggestedFileName: { type: Type.STRING }
          },
          required: ["summary", "tags", "sentiment", "suggestedFileName"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AiInsights;
  } catch (error) {
    console.error("Gemini Error:", error);
    // Fallback if AI fails or key is missing
    return {
      summary: "Could not generate AI insights at this time. Please try again later.",
      tags: ["video", "youtube", "download"],
      sentiment: "neutral",
      suggestedFileName: "video-download"
    };
  }
};