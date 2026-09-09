import bcrypt from "bcrypt";
import PasswordHasher from "../../application/services/PasswordHasher.js";

class BcryptPasswordHasher extends PasswordHasher {
  async hash(password) {
    return await bcrypt.hash(password, 10);
  }

  async compare(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}

export default BcryptPasswordHasher;
