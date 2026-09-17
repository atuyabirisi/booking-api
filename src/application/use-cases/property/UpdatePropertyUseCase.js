class UpdatePropertyUseCase {
  constructor(propertyRepository, imageStorage) {
    this.propertyRepository = propertyRepository;
    this.imageStorage = imageStorage;
  }

  async execute(propertyNumber, updateData, imagesToKeep = [], newImages = []) {
    const property =
      await this.propertyRepository.findByPropertyNumber(propertyNumber);

    if (!property)
      throw new Error(`Property with number ${propertyNumber} not found`);

    const dataToUpdate = {
      ...updateData,
    };

    let uploadedImages = [];

    if (newImages.length > 0)
      uploadedImages = await this.imageStorage.uploadImages(newImages);

    dataToUpdate.images = [...imagesToKeep, ...uploadedImages];

    const updatedProperty = await this.propertyRepository.updateProperty(
      propertyNumber,
      dataToUpdate,
    );

    return {
      propertyNumber: updatedProperty.propertyNumber,
      title: updatedProperty.title,
    };
  }
}

export default UpdatePropertyUseCase;
