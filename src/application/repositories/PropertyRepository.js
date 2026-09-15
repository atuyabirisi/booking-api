class PropertyRepository {
  async saveProperty(property) {
    throw new Error("saveProperty() must be implemented");
  }

  async findByPropertyNumber(propertyNumber) {
    throw new Error("findByPropertyNumber() must be implemented");
  }
}

export default PropertyRepository;
