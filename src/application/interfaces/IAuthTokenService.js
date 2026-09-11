class IAuthTokenService {
  async generateAuthToken(payload) {
    throw new Error("Method not implemented");
  }

  async verifyAuthToken(token) {
    throw new Error("Method not implemented");
  }
}

export default IAuthTokenService;
