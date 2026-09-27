class ChatWithGuestUseCase {
  constructor(aiService) {
    this.aiService = aiService;
  }

  async execute(message) {
    if (!message || typeof message !== "string")
      throw new Error("Message is required");

    const trimmedMessage = message.trim();

    if (!trimmedMessage) throw new Error("Message cannot be empty");

    return await this.aiService.generateResponse(trimmedMessage);
  }
}

export default ChatWithGuestUseCase;
