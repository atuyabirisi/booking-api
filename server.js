import "dotenv/config";
import mongoose from "mongoose";
import app from "./src/app.js";
import connectDatabase from "./src/infrastructure/db/connectDB.js";
import WinstonLogger from "./src/infrastructure/services/WinstonLogger.js";

const logger = new WinstonLogger();

const PORT = process.env.PORT;

let server;

process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.stack}`);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error(`Unhandled Rejection: ${reason?.stack || reason}`);
  process.exit(1);
});

const startServer = async (maxAttempts = 3, delay = 3000) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      logger.info(
        `Connecting to database (attempt ${attempt}/${maxAttempts})...`,
      );

      await connectDatabase(logger);

      server = app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
      });

      return;
    } catch (error) {
      logger.error(
        `Database connection attempt ${attempt} failed: ${
          error.stack || error
        }`,
      );

      if (attempt < maxAttempts) {
        logger.info(
          `Retrying database connection in ${delay / 1000} seconds...`,
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  logger.error("Maximum database connection attempts reached.");
  process.exit(1);
};

const gracefulShutdown = async (signal) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);

  if (server) {
    server.close(async () => {
      logger.info("HTTP server closed.");

      try {
        await mongoose.connection.close();
        logger.info("MongoDB connection closed.");

        process.exit(0);
      } catch (error) {
        logger.error(
          `Error closing MongoDB connection: ${error.stack || error}`,
        );

        process.exit(1);
      }
    });
  } else {
    try {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed.");

      process.exit(0);
    } catch (error) {
      logger.error(`Error closing MongoDB connection: ${error.stack || error}`);

      process.exit(1);
    }
  }
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

startServer();
