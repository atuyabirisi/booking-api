import Payment from "../../../domain/entities/Payment.js";

class InitiateBookingPaymentUseCase {
  constructor(
    propertyRepository,
    paymentRepository,
    bookingRepository,
    paymentGateway,
  ) {
    this.propertyRepository = propertyRepository;
    this.bookingRepository = bookingRepository;
    this.paymentRepository = paymentRepository;
    this.paymentGateway = paymentGateway;
  }

  async execute({ propertyNumber, guestName, guestPhone, checkIn, checkOut }) {
    const property =
      await this.propertyRepository.findByPropertyNumber(propertyNumber);

    if (!property) throw new Error("Property not found");

    const isAvailable = await this.propertyRepository.isAvailable(
      propertyNumber,
      checkIn,
      checkOut,
    );

    if (!isAvailable)
      throw new Error("Property is not available for the selected dates");

    const pricePerNight = property.pricePerNight;

    const numberOfNights = this.calculateNumberOfNights(checkIn, checkOut);

    const totalAmount = pricePerNight * numberOfNights;

    const paymentReference = this.generatePaymentReference();

    const payment = new Payment({
      paymentReference,
      propertyNumber,
      guestName,
      guestPhone,
      checkIn,
      checkOut,
      pricePerNight,
      numberOfNights,
      totalAmount,
      status: "PENDING",
      provider: "MPESA",
    });

    await this.paymentRepository.savePayment(payment);

    const paymentResponse = await this.paymentGateway.initiatePayment({
      phoneNumber: guestPhone,
      amount: totalAmount,
      paymentReference,
    });

    await this.paymentRepository.updatePayment(paymentReference, {
      providerRequestId: paymentResponse.providerRequestId,
      providerCheckoutId: paymentResponse.providerCheckoutId,
    });

    return {
      paymentReference,
      amount: totalAmount,
      numberOfNights,
      providerRequestId: paymentResponse.providerRequestId,
      providerCheckoutId: paymentResponse.providerCheckoutId,
      message: "Payment request initiated successfully",
    };
  }

  calculateNumberOfNights(checkIn, checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    return Math.round((checkOutDate - checkInDate) / millisecondsPerDay);
  }

  generatePaymentReference() {
    return `PAY-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  }
}

export default InitiateBookingPaymentUseCase;
