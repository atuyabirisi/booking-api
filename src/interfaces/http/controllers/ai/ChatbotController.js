class ChatbotController {
  constructor(chatWithGuestUseCase, logger) {
    this.chatWithGuestUseCase = chatWithGuestUseCase;
    this.logger = logger;
  }

  async chat(req, res) {
    try {
      const { message } = req.body;

      const response = await this.chatWithGuestUseCase.execute(message);

      return res.status(200).json({
        success: true,
        data: {
          message: response,
        },
      });
    } catch (error) {
      this.logger.error(`Failed to process chatbot request: ${error.message}`);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default ChatbotController;
