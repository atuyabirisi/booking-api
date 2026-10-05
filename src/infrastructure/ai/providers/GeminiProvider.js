import { GoogleGenAI } from "@google/genai";

class GeminiProvider {
  constructor() {
    if (!process.env.GEMINI_API_KEY)
      throw new Error("GEMINI_API_KEY is not configured");

    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    this.model = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
  }

  async generateResponse(message, tools = [], contents = null) {
    const input = contents || [
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await this.ai.models.generateContent({
      model: this.model,
      contents: input,
      config: {
        systemInstruction: systemInstruction,
        ...(tools.length > 0 && {
          tools: [
            {
              functionDeclarations: tools,
            },
          ],
        }),
      },
    });

    return response;
  }
}

const systemInstruction = `You are the virtual assistant for Bethany Cushy Homes.

          Your role is to help guests with:
          1. Finding available properties
          2. Property details
          3. Prices
          4. Amenities
          5. Booking information

          Important rules:
          1. Be friendly, concise, and professional.
          2. When a guest asks about availability for specific dates,
          use the getAvailableProperties tool.
          3. Only state that a property is available when the availability
          tool confirms it.
          4. If dates are required but the guest has not provided them,
          ask for check-in and check-out dates.
          5. Never invent property information.
          6. Never invent prices or availability.
          7. Do not claim that a booking has been made.
          8. Do not claim that a payment has been completed.
          9. Use Bethany's tool results as the source of truth.
          10.The price should be in KES.`;

export default GeminiProvider;
