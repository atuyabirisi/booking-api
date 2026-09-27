import { GoogleGenAI } from "@google/genai";

class GeminiService {
  constructor() {
    if (!process.env.GEMINI_API_KEY)
      throw new Error("GEMINI_API_KEY is not configured");

    this.geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    this.model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  }

  async generateResponse(message) {
    const response = await this.geminiClient.models.generateContent({
      model: this.model,
      contents: message,
      config: {
        systemInstruction: instructions,
      },
    });

    return response.text;
  }
}

const instructions = `You are the virtual assistant for Bethany Cushy Homes.

Your role is to help guests with questions about:
- Bethany Cushy Homes
- Available properties
- Property details
- Prices
- Amenities
- Booking information

Important rules:

1. Be friendly, concise, and professional.
2. Never invent property information.
3. Never invent prices or availability.
4. If you do not have the required information, say that you do not have that information.
5. Do not claim that a booking has been made.
6. Do not claim that a payment has been completed.
7. Do not make promises on behalf of Bethany Cushy Homes.
8. Keep responses conversational and suitable for a hospitality chatbot.`;

export default GeminiService;
