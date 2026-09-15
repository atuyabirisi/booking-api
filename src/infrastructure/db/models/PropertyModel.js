import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    propertyNumber: {
      type: String,
      unique: true,
    },

    title: String,

    description: String,

    pricePerNight: Number,

    location: String,

    address: String,

    bedrooms: Number,

    bathrooms: Number,

    maxGuests: Number,

    images: {
      type: [String],
      default: [],
    },

    amenities: {
      type: [String],
      default: [],
    },

    status: String,
  },
  {
    timestamps: true,
  },
);

const PropertyModel = mongoose.model("Property", propertySchema);

export default PropertyModel;
