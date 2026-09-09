class AuthController {
  constructor(signupUser, logger) {
    this.signupUser = signupUser;
    this.logger = logger;
  }

  async signup(req, res) {
    try {
      const user = await this.signupUser.execute(req.body);

      return res.status(201).json({
        success: true,
        data: user,
      });
    } catch (error) {
      this.logger.error(`Signup failed: ${error.stack}`);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default AuthController;
