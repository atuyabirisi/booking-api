class CreatePropertyController {
  constructor(createPropertyUseCase, logger) {
    this.createPropertyUseCase = createPropertyUseCase;
    this.logger = logger;
  }

  async createProperty(req, res) {
    try {
      const property = await this.createPropertyUseCase.execute(
        req.body,
        req.files,
      );

      return res.status(201).json({
        success: true,
        data: property,
      });
    } catch (error) {
      this.logger.error(`CreateProperty failed: ${error.stack}`);

      return res.status(400).json({
        success: false,
        message: "Failed to create property",
      });
    }
  }
}

export default CreatePropertyController;
