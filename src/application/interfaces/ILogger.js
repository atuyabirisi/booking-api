class Logger {
  info(message) {
    throw new Error("Logger.info() must be implemented");
  }

  error(message) {
    throw new Error("Logger.error() must be implemented");
  }
}

export default Logger;
