class PropertyAvailabilityUseCase {
  constructor(propertyRepository, bookingRepository) {
    this.propertyRepository = propertyRepository;
    this.bookingRepository = bookingRepository;
  }

  async execute({ checkIn, checkOut }) {
    this.validateDates(checkIn, checkOut);

    const properties = await this.propertyRepository.findAllProperties();

    const availableProperties = [];

    for (const property of properties) {
      if (property.status !== "available") continue;

      const available = await this.bookingRepository.isAvailable(
        property.propertyNumber,
        checkIn,
        checkOut,
      );

      if (available) {
        availableProperties.push({
          propertyNumber: property.propertyNumber,
          title: property.title,
          description: property.description,
          pricePerNight: property.pricePerNight,
          location: property.location,
          address: property.address,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          amenities: property.amenities,
          images: property.images,
        });
      }
    }

    return {
      checkIn,
      checkOut,
      count: availableProperties.length,
      properties: availableProperties,
    };
  }

  validateDates(checkIn, checkOut) {
    if (!this.isValidDate(checkIn))
      throw new Error("checkIn must be a valid date in YYYY-MM-DD format");

    if (!this.isValidDate(checkOut))
      throw new Error("checkOut must be a valid date in YYYY-MM-DD format");

    const start = new Date(`${checkIn}T00:00:00Z`);
    const end = new Date(`${checkOut}T00:00:00Z`);

    if (end <= start) throw new Error("checkOut must be after checkIn");
  }

  isValidDate(value) {
    if (typeof value !== "string") return false;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

    const date = new Date(`${value}T00:00:00Z`);

    return !Number.isNaN(date.getTime());
  }
}

export default PropertyAvailabilityUseCase;
