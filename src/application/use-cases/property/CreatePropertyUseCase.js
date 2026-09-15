import { Property } from "../../../domain/entities/Property.js";

class CreatePropertyUsecase {
  constructor(propertyRepository, imageStorage) {
    this.propertyRepository = propertyRepository;
    this.imageStorage = imageStorage;
  }

  async execute(propertyData, images = []) {
    const existingProperty = await this.propertyRepository.findByPropertyNumber(
      propertyData.propertyNumber,
    );

    if (existingProperty)
      throw new Error(`Property ${propertyData.propertyNumber} already exists`);

    const uploadedImages = await this.imageStorage.uploadImages(images);

    const property = new Property({
      ...propertyData,
      images: uploadedImages,
    });

    const savedProperty = await this.propertyRepository.saveProperty(property);

    return {
      propertyNumber: savedProperty.propertyNumber,
      title: savedProperty.title,
    };
  }
}

export default CreatePropertyUsecase;
