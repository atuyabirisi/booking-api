class DeletePropertyController {
  constructor(deletePropertyUseCase, logger) {
    this.deletePropertyUseCase = deletePropertyUseCase;
    this.logger = logger;
  }

  async deleteProperty(req, res) {
    try {
      const { propertyNumber } = req.params;

      const result = await this.deletePropertyUseCase.execute(propertyNumber);

      return res.status(200).json({
        success: true,
        message: result.message,
        data: {
          propertyNumber: result.propertyNumber,
        },
      });
    } catch (error) {
      this.logger.error(`Delete property failed: ${error.stack}`);

      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default DeletePropertyController;
