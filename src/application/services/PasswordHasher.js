class PasswordHasher {
  async hash(password) {
    throw new Error("Method not implemented");
  }

  async verifyPassword(password, hashedPassword) {
    throw new Error("Method not implemented");
  }
}

export default PasswordHasher;
