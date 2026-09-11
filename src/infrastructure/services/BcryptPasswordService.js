import bcrypt from "bcrypt";
import IPasswordService from "../../application/interfaces/IPasswordService.js";

class BcryptPasswordService extends IPasswordService {
  async hash(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default BcryptPasswordService;
