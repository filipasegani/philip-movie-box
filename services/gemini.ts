
import { GoogleGenAI, Type } from "@google/genai";
import { Movie } from "../types";

export const geminiService = {
  getAIRecommendations: async (favoriteMovies: Movie[]): Promise<string> => {
    if (!process.env.API_KEY) return "AI recommendations currently unavailable.";
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const favoritesList = favoriteMovies.map(m => m.title).join(", ");
    
    const prompt = `Based on these movies: [${favoritesList}], suggest 5 other great movies I might like. 
    Briefly explain why for each one. Structure the response clearly.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 0 }
        }
      });
      return response.text || "I couldn't generate recommendations right now.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Failed to get AI recommendations. Please check your connection.";
    }
  },

  getMovieAnalysis: async (movieTitle: string, overview: string): Promise<string> => {
    if (!process.env.API_KEY) return "AI insights currently unavailable.";
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Tell me deep cinematic insights about the movie "${movieTitle}". 
    The overview is: "${overview}". Focus on themes, visual style, and why it's a significant film. Keep it concise but expert.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return response.text || "No insights available.";
    } catch (error) {
      return "Unable to analyze movie at this time.";
    }
  }
};
