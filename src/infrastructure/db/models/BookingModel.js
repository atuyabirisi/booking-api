import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    propertyNumber: {
      type: String,
      required: true,
      index: true,
    },

    guestName: {
      type: String,
      required: true,
      trim: true,
    },

    guestEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    guestPhone: {
      type: String,
      required: true,
      trim: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },

    numberOfNights: {
      type: Number,
      required: true,
      min: 1,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentReference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["confirmed", "completed", "cancelled"],
      default: "confirmed",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const BookingModel = mongoose.model("Booking", bookingSchema);

export default BookingModel;
