class PaymentRepository {
  async savePayment(payment) {
    throw new Error("Method 'save()' must be implemented");
  }

  async findByPaymentReference(paymentReference) {
    throw new Error("Method 'findByPaymentReference()' must be implemented");
  }

  async findByProviderCheckoutId(providerCheckoutId) {
    throw new Error("Method 'findByProviderCheckoutId()' must be implemented");
  }

  async updatePayment(paymentReference, dataToUpdate) {
    throw new Error("Method 'updatePayment()' must be implemented");
  }
}

export default PaymentRepository;
