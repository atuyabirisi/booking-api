class PropertyRepository {
  async saveProperty(property) {
    throw new Error("saveProperty() must be implemented");
  }

  async findByPropertyNumber(propertyNumber) {
    throw new Error("findByPropertyNumber() must be implemented");
  }

  async updateProperty(propertyNumber, dataToUpdate) {
    throw new Error("updateProperty() must be implemented");
  }

  async deleteProperty(propertyNumber) {
    throw new Error("deleteProperty() must be implemented");
  }

  async isAvailable(propertyNumber) {
    throw new Error("isAvailable() must be implemented");
  }
}

export default PropertyRepository;
