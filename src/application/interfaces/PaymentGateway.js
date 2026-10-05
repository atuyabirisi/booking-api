class PaymentGateway {
  async initiatePayment({ phoneNumber, amount, paymentReference }) {
    throw new Error("Method 'initiatePayment()' must be implemented");
  }
}

export default PaymentGateway;

// class PaymentGateway {
//   constructor(phoneNumber, amount, paymentReference) {
//     this.phoneNumber = phoneNumber;
//     this.amount = amount;
//     this.paymentReference = paymentReference;
//   }
//   async initiatePayment(phoneNumber, amount, paymentReference) {
//     throw new Error("Method initiatePayment() must be implemented");
//   }
// }
