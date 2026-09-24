class Payment {
  constructor({
    paymentReference,
    propertyNumber,
    guestName,
    guestPhone,
    checkIn,
    checkOut,
    pricePerNight,
    numberOfNights,
    totalAmount,
    status = "PENDING",
    provider = null,
    providerRequestId = null,
    providerCheckoutId = null,
    providerTransactionId = null,
  }) {
    this.paymentReference = paymentReference;
    this.propertyNumber = propertyNumber;
    this.guestName = guestName;
    this.guestPhone = guestPhone;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.pricePerNight = pricePerNight;
    this.numberOfNights = numberOfNights;
    this.totalAmount = totalAmount;
    this.status = status;
    this.provider = provider;
    this.providerRequestId = providerRequestId;
    this.providerCheckoutId = providerCheckoutId;
    this.providerTransactionId = providerTransactionId;

    this.validate();
  }

  markAsPaid(providerTransactionId) {
    if (this.status === "PAID") return;
    this.status = "PAID";
    this.providerTransactionId = providerTransactionId;
  }

  markAsFailed() {
    if (this.status === "PAID") return;
    this.status = "FAILED";
  }

  validate() {
    if (!this.paymentReference)
      throw new Error("Payment reference is required");

    if (!this.propertyNumber) throw new Error("Property number is required");

    if (!this.guestName) throw new Error("Guest name is required");

    if (!this.guestPhone) throw new Error("Guest phone is required");

    if (!this.checkIn) throw new Error("Check-in date is required");

    if (!this.checkOut) throw new Error("Check-out date is required");

    if (this.pricePerNight <= 0)
      throw new Error("Price per night must be greater than zero");

    if (this.numberOfNights <= 0)
      throw new Error("Number of nights must be greater than zero");

    if (this.totalAmount <= 0)
      throw new Error("Total amount must be greater than zero");

    const validStatuses = ["PENDING", "SUCCESSFUL", "FAILED"];

    if (!validStatuses.includes(this.status))
      throw new Error("Invalid payment status");
  }
}

export default Payment;
