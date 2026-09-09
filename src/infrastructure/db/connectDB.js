import mongoose from "mongoose";

const connectDatabase = async (logger) => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

export default connectDatabase;
