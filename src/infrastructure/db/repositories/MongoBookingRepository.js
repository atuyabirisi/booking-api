import BookingRepository from "../../../application/repositories/BookingRepository.js";
import BookingModel from "../../db/models/BookingModel.js";

class MongoBookingRepository extends BookingRepository {
  async save(booking) {
    return await BookingModel.create(booking);
  }

  async findByBookingReference(bookingReference) {
    return await BookingModel.findOne({
      bookingReference,
    });
  }

  async isAvailable(propertyNumber, checkIn, checkOut) {
    const conflictingBooking = await BookingModel.findOne({
      propertyNumber,

      status: {
        $in: ["confirmed", "completed"],
      },

      checkIn: {
        $lt: new Date(checkOut),
      },

      checkOut: {
        $gt: new Date(checkIn),
      },
    });

    return !conflictingBooking;
  }

  async updateBooking(bookingReference, dataToUpdate) {
    return await BookingModel.findOneAndUpdate(
      { bookingReference },
      { $set: dataToUpdate },
      {
        new: true,
        runValidators: true,
      },
    );
  }
}

export default MongoBookingRepository;
