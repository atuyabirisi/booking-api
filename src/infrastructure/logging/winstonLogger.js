import fs from "fs";
import path from "path";
import winston from "winston";
import Logger from "../../application/logging/Logger.js";

class WinstonLogger extends Logger {
  constructor() {
    super();

    const logsDir = path.join(process.cwd(), "logs");

    fs.mkdirSync(logsDir, { recursive: true });

    this.logger = winston.createLogger({
      level: "info",

      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level.toUpperCase()} - ${message}`;
        }),
      ),

      transports: [
        new winston.transports.Console(),

        new winston.transports.File({
          filename: path.join(logsDir, "error.log"),
          level: "error",
        }),

        new winston.transports.File({
          filename: path.join(logsDir, "aggregated.log"),
        }),
      ],
    });
  }

  info(message) {
    this.logger.info(message);
  }

  error(message) {
    this.logger.error(message);
  }
}

export default WinstonLogger;
