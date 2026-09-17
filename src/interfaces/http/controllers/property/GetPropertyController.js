class GetPropertyController {
  constructor(getPropertyUseCase, logger) {
    this.getPropertyUseCase = getPropertyUseCase;
    this.logger = logger;
  }

  async getProperty(req, res) {
    try {
      const { propertyNumber } = req.params;

      const property = await this.getPropertyUseCase.execute(propertyNumber);

      return res.status(200).json({
        success: true,
        data: property,
      });
    } catch (error) {
      this.logger.error(`Get property failed: ${error.stack}`);

      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default GetPropertyController;
