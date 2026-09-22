import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentReference: {
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

    status: {
      type: String,
      required: true,
      enum: ["PENDING", "SUCCESSFUL", "FAILED"],
      default: "PENDING",
    },

    provider: {
      type: String,
      default: null,
    },

    providerRequestId: {
      type: String,
      default: null,
      index: true,
    },

    providerCheckoutId: {
      type: String,
      default: null,
      index: true,
    },

    providerTransactionId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const PaymentModel = mongoose.model("Payment", paymentSchema);

export default PaymentModel;
