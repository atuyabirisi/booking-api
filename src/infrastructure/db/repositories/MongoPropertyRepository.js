import PropertyRepository from "../../../application/repositories/PropertyRepository.js";
import PropertyModel from "../models/PropertyModel.js";

class MongoPropertyRepository extends PropertyRepository {
  async saveProperty(property) {
    return PropertyModel.create({
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
  }

  async findByPropertyNumber(propertyNumber) {
    return PropertyModel.findOne({
      propertyNumber,
    });
  }

  async updateProperty(propertyNumber, dataToUpdate) {
    return PropertyModel.findOneAndUpdate(
      { propertyNumber },
      { $set: dataToUpdate },
      {
        new: true,
        runValidators: true,
      },
    );
  }
}

export default MongoPropertyRepository;
