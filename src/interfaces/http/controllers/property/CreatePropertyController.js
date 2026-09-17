class CreatePropertyController {
  constructor(createPropertyUseCase, logger) {
    this.createPropertyUseCase = createPropertyUseCase;
    this.logger = logger;
  }

  async createProperty(req, res) {
    try {
      const propertyData = {
        ...req.body,

        pricePerNight: Number(req.body.pricePerNight),
        bedrooms: Number(req.body.bedrooms),
        bathrooms: Number(req.body.bathrooms),
        maxGuests: Number(req.body.maxGuests),

        amenities: Array.isArray(req.body.amenities)
          ? req.body.amenities
          : req.body.amenities
            ? [req.body.amenities]
            : [],
      };

      const property = await this.createPropertyUseCase.execute(
        propertyData,
        req.files,
      );

      return res.status(201).json({
        success: true,
        data: property,
      });
    } catch (error) {
      console.error("CREATE PROPERTY ERROR:", error);

      this.logger.error(`CreateProperty failed: ${error.stack}`);

      return res.status(400).json({
        success: false,
        message: "Failed to create property",
      });
    }
  }
}

export default CreatePropertyController;
