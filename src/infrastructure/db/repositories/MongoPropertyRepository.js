import PropertyRepository from "../../../application/repositories/PropertyRepository.js";
import PropertyModel from "../models/PropertyModel.js";

class MongoPropertyRepository extends PropertyRepository {
  async saveProperty(property) {
    const propertyDocument = await PropertyModel.create({
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
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    });

    return propertyDocument;
  }

  async findByPropertyNumber(propertyNumber) {
    return await PropertyModel.findOne({
      propertyNumber,
    });
  }
}

export default MongoPropertyRepository;
