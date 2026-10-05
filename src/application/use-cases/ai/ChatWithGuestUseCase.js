import getAvailableProperties from "../../../infrastructure/ai/tools/getAvailableProperties.js";

class ChatWithGuestUseCase {
  constructor(aiProvider, propertyAvailabilityUseCase) {
    this.aiProvider = aiProvider;
    this.propertyAvailabilityUseCase = propertyAvailabilityUseCase;
  }

  async execute(message) {
    if (message == null || typeof message !== "string")
      throw new Error("Message is required");

    const trimmedMessage = message.trim();

    if (!trimmedMessage) throw new Error("Message cannot be empty");

    const tools = [getAvailableProperties];

    const response = await this.aiProvider.generateResponse(
      trimmedMessage,
      tools,
    );

    const functionCalls = response.functionCalls;

    // Gemini answered normally without needing a tool.
    if (!functionCalls || functionCalls.length === 0) return response.text;

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: trimmedMessage,
          },
        ],
      },

      response.candidates[0].content,
    ];

    for (const functionCall of functionCalls) {
      if (functionCall.name === "getAvailableProperties") {
        const result = await this.propertyAvailabilityUseCase.execute(
          functionCall.args,
        );

        contents.push({
          role: "user",
          parts: [
            {
              functionResponse: {
                name: functionCall.name,
                response: result,
              },
            },
          ],
        });
      }
    }

    const finalResponse = await this.aiProvider.generateResponse(
      null,
      tools,
      contents,
    );

    return finalResponse.text;
  }
}

export default ChatWithGuestUseCase;
