class DeletePropertyUseCase {
  constructor(propertyRepository) {
    this.propertyRepository = propertyRepository;
  }

  async execute(propertyNumber) {
    const property =
      await this.propertyRepository.findByPropertyNumber(propertyNumber);

    if (!property)
      throw new Error(`Property with number ${propertyNumber} not found`);

    await this.propertyRepository.deleteProperty(propertyNumber);

    return {
      propertyNumber: property.propertyNumber,
      message: "Property deleted successfully",
    };
  }
}

export default DeletePropertyUseCase;
