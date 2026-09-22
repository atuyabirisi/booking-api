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

  async updatePayment(paymentReference, dataToUpdate) {
    return await PaymentModel.findOneAndUpdate(
      { paymentReference },
      { $set: dataToUpdate },
      {
        new: true,
        runValidators: true,
      },
    );
  }
}

export default MongoPaymentRepository;
