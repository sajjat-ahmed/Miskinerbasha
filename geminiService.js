import { GoogleGenAI } from "@google/genai";

// The Gemini client requires an API key. In development you may not set one —
// avoid constructing the client in that case so the browser doesn't throw.
const API_KEY = typeof process !== 'undefined' ? process.env.API_KEY : undefined;

let ai = null;
if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch (err) {
    console.warn('Failed to initialize Gemini client:', err);
    ai = null;
  }
} else {
  // Silently allow app to run without AI features but log for developer visibility.
  // Do not throw — embedding API keys in client bundles is insecure anyway.
  // Recommended: move calls to a server-side endpoint that holds the API key.
  console.warn('Gemini API key not found. AI features are disabled. Set GEMINI_API_KEY in your environment to enable.');
}

export const getSmartRoomDescription = async (details) => {
  if (!ai) {
    // graceful fallback when AI isn't available
    return 'Affordable housing option for students in a prime location.';
  }

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
    console.error('Gemini description error:', error);
    return 'Affordable housing option for students in a prime location.';
  }
};

export const getAreaInsights = async (area) => {
  if (!ai) {
    return 'A popular area for students with plenty of amenities nearby.';
  }

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
    console.error('Gemini area insights error:', error);
    return 'A popular area for students with plenty of amenities nearby.';
  }
};
