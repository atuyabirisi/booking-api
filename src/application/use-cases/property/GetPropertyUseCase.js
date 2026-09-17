class GetPropertyUseCase {
  constructor(propertyRepository) {
    this.propertyRepository = propertyRepository;
  }

  async execute(propertyNumber) {
    const property =
      await this.propertyRepository.findByPropertyNumber(propertyNumber);

    if (!property)
      throw new Error(`Property with number ${propertyNumber} not found`);

    return {
      propertyNumber: property.propertyNumber,
      title: property.title,
      description: property.description,
      pricePerNight: property.pricePerNight,
      location: property.location,
      address: property.address,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      maxGuests: property.maxGuests,
      images: property.images,
      amenities: property.amenities,
      status: property.status,
    };
  }
}

export default GetPropertyUseCase;
