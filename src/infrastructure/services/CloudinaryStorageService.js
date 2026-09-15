import { v2 as cloudinary } from "cloudinary";
import IImageStorage from "../../application/interfaces/IImageStorage.js";

cloudinary.config({
  cloud_name: Process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class CloudinaryImageStorage extends IImageStorage {
  constructor(cloudinaryClient = cloudinary) {
    super();
    this.cloudinary = cloudinaryClient;
  }

  async uploadImages(images) {
    if (!Array.isArray(images) || images.length === 0) return [];

    try {
      const uploadPromises = images.map((image) => this.uploadImage(image));
      return await Promise.all(uploadPromises);
    } catch (error) {
      throw new Error(`Image upload failed: ${error.message}`);
    }
  }

  async uploadImage(image) {
    if (!image?.buffer) throw new Error("Invalid image file");

    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        {
          folder: "articles",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result.secure_url);
        },
      );

      uploadStream.end(image.buffer);
    });
  }
}

export default CloudinaryImageStorage;
