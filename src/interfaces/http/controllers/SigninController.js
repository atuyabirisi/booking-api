class SigninController {
  constructor(signinUser, logger) {
    this.signinUser = signinUser;
    this.logger = logger;
  }

  async signin(req, res) {
    try {
      const { email, password } = req.body;
      const authToken = await this.signinUser.execute({ email, password });

      return res.status(200).json({
        success: true,
        data: authToken,
      });
    } catch (error) {
      this.logger.error(`Signin failed: ${error.stack}`);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default SigninController;
