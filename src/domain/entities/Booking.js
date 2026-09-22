const booking_status = Object.freeze({
  confirmed: "confirmed",
  completed: "completed",
  cancelled: "cancelled",
});

class Booking {
  constructor({
    bookingReference,
    propertyNumber,
    guestName,
    guestEmail,
    guestPhone,
    checkIn,
    checkOut,
    guests,
    pricePerNight,
    numberOfNights,
    totalAmount,
    paymentReference,
    status = booking_status.confirmed,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.validateBookingReference(bookingReference);
    this.validateText(propertyNumber, "propertyNumber");
    this.validateText(guestName, "guestName");
    this.validateEmail(guestEmail);
    this.validateText(guestPhone, "guestPhone");

    this.validateDate(checkIn, "checkIn");
    this.validateDate(checkOut, "checkOut");
    this.validateDateRange(checkIn, checkOut);

    this.validatePositiveInteger(guests, "guests");
    this.validatePrice(pricePerNight);
    this.validatePositiveInteger(numberOfNights, "numberOfNights");
    this.validatePrice(totalAmount);

    this.validateText(paymentReference, "paymentReference");
    this.validateStatus(status);

    this.bookingReference = bookingReference.trim();
    this.propertyNumber = propertyNumber.trim();
    this.guestName = guestName.trim();
    this.guestEmail = guestEmail.trim().toLowerCase();
    this.guestPhone = guestPhone.trim();

    this.checkIn = new Date(checkIn);
    this.checkOut = new Date(checkOut);

    this.guests = guests;
    this.pricePerNight = pricePerNight;
    this.numberOfNights = numberOfNights;
    this.totalAmount = totalAmount;
    this.paymentReference = paymentReference.trim();

    this.status = status;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  touch() {
    this.updatedAt = new Date();
  }

  confirm() {
    if (this.status === booking_status.cancelled)
      throw new Error("Cancelled booking cannot be confirmed");

    this.status = booking_status.confirmed;
    this.touch();
  }

  complete() {
    if (this.status !== booking_status.confirmed)
      throw new Error("Only a confirmed booking can be completed");

    this.status = booking_status.completed;
    this.touch();
  }

  cancel() {
    if (this.status === booking_status.completed)
      throw new Error("Completed booking cannot be cancelled");

    this.status = booking_status.cancelled;
    this.touch();
  }

  validateBookingReference(bookingReference) {
    if (typeof bookingReference !== "string" || !bookingReference.trim())
      throw new Error("Booking reference is required");
  }

  validateText(value, fieldName) {
    if (typeof value !== "string" || !value.trim())
      throw new Error(`${fieldName} is required`);
  }

  validateEmail(email) {
    if (
      typeof email !== "string" ||
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    )
      throw new Error("Valid email is required");
  }

  validateDate(value, fieldName) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime()))
      throw new Error(`${fieldName} must be a valid date`);
  }

  validateDateRange(checkIn, checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate)
      throw new Error("Check-out must be after check-in");
  }

  validatePositiveInteger(value, fieldName) {
    if (!Number.isInteger(value) || value <= 0)
      throw new Error(`${fieldName} must be a positive integer`);
  }

  validatePrice(value) {
    if (!Number.isFinite(value) || value <= 0)
      throw new Error("Amount must be greater than zero");
  }

  validateStatus(status) {
    if (!Object.values(booking_status).includes(status))
      throw new Error(`Invalid booking status: ${status}`);
  }
}

export { Booking, booking_status };
