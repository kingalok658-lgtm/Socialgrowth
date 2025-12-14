import { GoogleGenAI, Type } from "@google/genai";
import { DailyStats, Post } from '../types';

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSocialAdvice = async (stats: DailyStats[], posts: Post[]) => {
  try {
    const ai = getAiClient();
    
    // Prepare a summary of the data for the prompt
    // We only take the last 14 entries to keep the context window focused and relevant
    const recentStats = stats.slice(-14);
    const topPosts = posts.slice(0, 10);

    const promptContext = `
      I am a social media manager. Here is my recent data:
      
      Recent Daily Stats (JSON):
      ${JSON.stringify(recentStats)}

      Top Performing Posts (JSON):
      ${JSON.stringify(topPosts)}

      Please provide specific, actionable growth advice.
      Analyze the trends in followers and engagement.
      Suggest what type of content to double down on based on the top posts.
      Identify if I am posting enough.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptContext,
      config: {
        systemInstruction: "You are an expert Social Media Growth Strategist. Your tone is encouraging, data-driven, and direct. Keep advice concise.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: {
              type: Type.STRING,
              description: "A summary paragraph of the analysis and strategic advice."
            },
            focusArea: {
              type: Type.STRING,
              description: "A short phrase describing the main area to improve (e.g., 'Increase Reel Frequency' or 'Improve Shorts Hooks')."
            },
            actionItems: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of 3-5 specific, bullet-point tasks the user should do."
            }
          },
          required: ["advice", "focusArea", "actionItems"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    } else {
      throw new Error("No response text from Gemini");
    }

  } catch (error) {
    console.error("Error generating advice:", error);
    throw error;
  }
};