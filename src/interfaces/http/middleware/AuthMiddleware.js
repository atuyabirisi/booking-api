class AuthMiddleware {
  constructor(tokenService, logger) {
    this.tokenService = tokenService;
    this.logger = logger;
  }

  authenticate(req, res, next) {
    try {
      const token = req.header("x-auth-token");
      if (token == null || token === undefined) {
        return res.status(401).json({
          success: false,
          message: "Authentication token is required",
        });
      }

      const deodedUser = this.tokenService.verifyAuthToken(token);
      req.user = deodedUser;
      next();
    } catch (error) {
      this.logger.error(
        "Authentication failed",
        `${error.stack || error.message}`,
      );
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token",
      });
    }
  }
}

export default AuthMiddleware;
