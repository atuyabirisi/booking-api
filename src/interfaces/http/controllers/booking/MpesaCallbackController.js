class MpesaCallbackController {
  constructor(handleMpesaCallbackUseCase, logger) {
    this.handleMpesaCallbackUseCase = handleMpesaCallbackUseCase;
    this.logger = logger;
  }

  async handleCallback(req, res) {
    console.log("🔥 MPESA CALLBACK RECEIVED");
    try {
      const result = await this.handleMpesaCallbackUseCase.execute(req.body);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      this.logger.error(`Failed to process M-Pesa callback: ${error.message}`);

      return res.status(200).json({
        ResultCode: 0,
        ResultDesc: "Callback received",
      });
    }
  }
}

export default MpesaCallbackController;
