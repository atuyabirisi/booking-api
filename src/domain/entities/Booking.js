class Booking {
  static BOOKING_STATES = {
    CONFIRMED: "confirmed",
    CANCELLED: "cancelled",
    CHECKED_OUT: "checked_out",
  };

  constructor({
    bookingReference,
    propertyNumber,
    guestName,
    guestPhone,
    checkIn,
    checkOut,
    pricePerNight,
    paymentReference,
    status = Booking.booking_states.confirmed,
  }) {
    this.validateBookingReference(bookingReference);
    this.validatePropertyNumber(propertyNumber);
    this.validateGuestName(guestName);
    this.validateGuestPhone(guestPhone);
    this.validateDates(checkIn, checkOut);
    this.validatePrice(pricePerNight);
    this.validatePaymentReference(paymentReference);
    this.validateStatus(status);

    this.bookingReference = bookingReference.trim();
    this.propertyNumber = propertyNumber.trim();
    this.guestName = guestName.trim();
    this.guestPhone = guestPhone.trim();
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.pricePerNight = pricePerNight;
    this.numberOfNights = this.calculateNumberOfNights(checkIn, checkOut);
    this.totalAmount = this.calculateTotalAmount(
      pricePerNight,
      this.numberOfNights,
    );
    this.paymentReference = paymentReference.trim();
    this.status = status;
  }

  validateBookingReference(bookingReference) {
    if (
      !bookingReference ||
      typeof bookingReference !== "string" ||
      !bookingReference.trim()
    ) {
      throw new Error("Booking reference is required");
    }
  }

  validatePropertyNumber(propertyNumber) {
    if (
      !propertyNumber ||
      typeof propertyNumber !== "string" ||
      !propertyNumber.trim()
    )
      throw new Error("Property number is required");
  }

  validateGuestName(guestName) {
    if (!guestName || typeof guestName !== "string" || !guestName.trim())
      throw new Error("Guest name is required");
  }

  validateGuestPhone(guestPhone) {
    if (!guestPhone || typeof guestPhone !== "string" || !guestPhone.trim())
      throw new Error("Guest phone is required");
  }

  validateDates(checkIn, checkOut) {
    if (!checkIn || !checkOut)
      throw new Error("Check-in and check-out dates are required");

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (
      Number.isNaN(checkInDate.getTime()) ||
      Number.isNaN(checkOutDate.getTime())
    )
      throw new Error("Invalid booking dates");

    if (checkOutDate <= checkInDate)
      throw new Error("Check-out date must be after check-in date");
  }

  validatePrice(pricePerNight) {
    if (
      typeof pricePerNight !== "number" ||
      !Number.isFinite(pricePerNight) ||
      pricePerNight < 0
    )
      throw new Error("Price per night must be a non-negative number");
  }

  validatePaymentReference(paymentReference) {
    if (
      !paymentReference ||
      typeof paymentReference !== "string" ||
      !paymentReference.trim()
    )
      throw new Error("Payment reference is required");
  }

  validateStatus(status) {
    if (!Object.values(Booking.BOOKING_STATES).includes(status))
      throw new Error(`Invalid booking status: ${status}`);
  }

  calculateNumberOfNights(checkIn, checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    return (checkOutDate - checkInDate) / millisecondsPerDay;
  }

  calculateTotalAmount(pricePerNight, numberOfNights) {
    return pricePerNight * numberOfNights;
  }
}

export default Booking;
