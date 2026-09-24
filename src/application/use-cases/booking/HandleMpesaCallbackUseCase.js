import { Booking, booking_status } from "../../../domain/entities/Booking.js";

class HandleMpesaCallbackUseCase {
  constructor(paymentRepository, bookingRepository, logger) {
    this.paymentRepository = paymentRepository;
    this.bookingRepository = bookingRepository;
    this.logger = logger;
  }

  async execute(callbackData) {
    const stkCallback = callbackData?.Body?.stkCallback;

    if (!stkCallback) throw new Error("Invalid M-Pesa callback payload");

    const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } =
      stkCallback;

    this.logger.info(
      `Received M-Pesa callback - CheckoutRequestID: ${CheckoutRequestID}, ResultCode: ${ResultCode}`,
    );

    const payment =
      await this.paymentRepository.findByProviderCheckoutId(CheckoutRequestID);

    if (!payment) {
      this.logger.error(
        `Payment not found for CheckoutRequestID: ${CheckoutRequestID}`,
      );

      throw new Error("Payment not found");
    }

    if (payment.status === "SUCCESSFUL") {
      this.logger.info(
        `Payment ${payment.paymentReference} has already been processed`,
      );

      return {
        success: true,
        message: "Payment already processed",
      };
    }

    if (ResultCode === 0) {
      const metadata = this.extractCallbackMetadata(CallbackMetadata);

      await this.paymentRepository.updatePayment(payment.paymentReference, {
        status: "SUCCESSFUL",
        providerTransactionId: metadata.mpesaReceiptNumber,
      });

      const booking = new Booking({
        bookingReference: `BK-${Date.now()}`,
        propertyNumber: payment.propertyNumber,
        guestName: payment.guestName,
        guestPhone: payment.guestPhone,
        checkIn: payment.checkIn,
        checkOut: payment.checkOut,
        pricePerNight: payment.pricePerNight,
        numberOfNights: payment.numberOfNights,
        totalAmount: payment.totalAmount,
        paymentReference: payment.paymentReference,
        status: booking_status.confirmed,
      });

      await this.bookingRepository.createBooking(booking);

      this.logger.info(
        `Booking ${booking.bookingReference} created successfully for payment ${payment.paymentReference}`,
      );

      this.logger.info(
        `Payment ${payment.paymentReference} was successfully completed. M-Pesa receipt: ${metadata.mpesaReceiptNumber}`,
      );

      return {
        success: true,
        message: "Payment and booking processed successfully",
        paymentReference: payment.paymentReference,
        providerTransactionId: metadata.mpesaReceiptNumber,
        bookingReference: booking.bookingReference,
      };
    }

    await this.paymentRepository.updatePayment(payment.paymentReference, {
      status: "FAILED",
    });

    this.logger.info(
      `Payment ${payment.paymentReference} failed. ResultCode: ${ResultCode}, ResultDesc: ${ResultDesc}`,
    );

    return {
      success: true,
      message: "Payment failed",
      paymentReference: payment.paymentReference,
    };
  }

  extractCallbackMetadata(callbackMetadata) {
    const items = callbackMetadata?.Item || [];

    const metadata = {};

    for (const item of items) {
      switch (item.Name) {
        case "Amount":
          metadata.amount = item.Value;
          break;

        case "MpesaReceiptNumber":
          metadata.mpesaReceiptNumber = item.Value;
          break;

        case "TransactionDate":
          metadata.transactionDate = item.Value;
          break;

        case "PhoneNumber":
          metadata.phoneNumber = item.Value;
          break;

        default:
          break;
      }
    }

    return metadata;
  }
}

export default HandleMpesaCallbackUseCase;
