class IImageStorage {
  async uploadImages(images) {
    throw new Error("uploadImages() must be implemented");
  }
}

export default IImageStorage;
