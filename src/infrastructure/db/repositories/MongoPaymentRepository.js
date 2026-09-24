import PaymentRepository from "../../../application/repositories/PaymentRepository.js";
import PaymentModel from "../../db/models/PaymentModel.js";

class MongoPaymentRepository extends PaymentRepository {
  async savePayment(payment) {
    return await PaymentModel.create(payment);
  }

  async findByPaymentReference(paymentReference) {
    return await PaymentModel.findOne({
      paymentReference,
    });
  }

  async findByProviderCheckoutId(providerCheckoutId) {
    return await PaymentModel.findOne({
      providerCheckoutId,
    });
  }

  async updatePayment(paymentReference, dataToUpdate) {
    return await PaymentModel.findOneAndUpdate(
      { paymentReference },
      { $set: dataToUpdate },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
  }
}

export default MongoPaymentRepository;
