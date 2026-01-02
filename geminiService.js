import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartRoomDescription = async (details) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate an attractive, student-friendly 2-sentence description for a rental listing in Dhaka based on these details: ${JSON.stringify(details)}. Make it sound trustworthy and local.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini description error:", error);
    return "Affordable housing option for students in a prime location.";
  }
};

export const getAreaInsights = async (area) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide 3 quick bullet points about living in ${area}, Dhaka as a student. Focus on transport, food, and safety.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    return "A popular area for students with plenty of amenities nearby.";
  }
};
