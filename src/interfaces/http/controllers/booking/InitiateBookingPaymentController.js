class InitiateBookingPaymentController {
  constructor(initiateBookingPaymentUseCase, logger) {
    this.initiateBookingPaymentUseCase = initiateBookingPaymentUseCase;
    this.logger = logger;
  }
  async initiatePayment(req, res) {
    try {
      const { propertyNumber, guestName, guestPhone, checkIn, checkOut } =
        req.body;
      const result = await this.initiateBookingPaymentUseCase.execute({
        propertyNumber,
        guestName,
        guestPhone,
        checkIn,
        checkOut,
      });
      return res
        .status(200)
        .json({
          success: true,
          message: result.message,
          data: {
            paymentReference: result.paymentReference,
            amount: result.amount,
            numberOfNights: result.numberOfNights,
            providerRequestId: result.providerRequestId,
            providerCheckoutId: result.providerCheckoutId,
          },
        });
    } catch (error) {
      this.logger.error(`Failed to initiate booking payment: ${error.message}`);
      return res.status(400).json({ success: false, message: error.message });
    }
  }
}
export default InitiateBookingPaymentController;
