import IAuthTokenService from "../../application/interfaces/IAuthTokenService.js";
import jwt from "jsonwebtoken";

class JwtService extends IAuthTokenService {
  constructor(secretKey, expiresIn, logger) {
    super();

    this.secretKey = secretKey;
    this.expiresIn = expiresIn;
    this.logger = logger;
  }

  async generateAuthToken(payload) {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: this.expiresIn,
    });
  }

  async verifyAuthToken(token) {
    try {
      return jwt.verify(token, this.secretKey);
    } catch (error) {
      this.logger.error(`Token verification failed: ${error.message}`);

      throw new Error("Invalid token");
    }
  }
}

export default JwtService;
