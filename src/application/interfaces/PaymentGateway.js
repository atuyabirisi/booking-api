class PaymentGateway {
  async initiatePayment({ phoneNumber, amount, paymentReference }) {
    throw new Error("Method 'initiatePayment()' must be implemented");
  }
}

export default PaymentGateway;
