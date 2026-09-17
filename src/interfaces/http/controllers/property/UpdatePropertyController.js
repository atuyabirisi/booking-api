class UpdatePropertyController {
  constructor(updatePropertyUseCase, logger) {
    this.updatePropertyUseCase = updatePropertyUseCase;
    this.logger = logger;
  }

  async updateProperty(req, res) {
    try {
      const { propertyNumber } = req.params;

      const updateData = {
        ...req.body,
      };

      const imagesToKeep = req.body.imagesToKeep
        ? JSON.parse(req.body.imagesToKeep)
        : [];

      const newImages = req.files || [];

      const updatedProperty = await this.updatePropertyUseCase.execute(
        propertyNumber,
        updateData,
        imagesToKeep,
        newImages,
      );

      return res.status(200).json({
        success: true,
        message: "Property updated successfully",
        data: updatedProperty,
      });
    } catch (error) {
      this.logger.error(`Update property failed: ${error.stack}`);

      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default UpdatePropertyController;
