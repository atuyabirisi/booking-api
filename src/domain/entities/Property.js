const property_status = Object.freeze({
  available: "available",
  booked: "booked",
  maintenance: "maintenance",
});

class Property {
  constructor({
    propertyNumber,
    title,
    description,
    pricePerNight,
    location,
    address,
    bedrooms,
    bathrooms,
    maxGuests,
    images = [],
    amenities = [],
    status = property_status.available,
    createdAt = new Date(),
    updatedAt = new Date(),
  }) {
    this.validatePropertyNumber(propertyNumber);
    this.validateText(title, "title");
    this.validateText(description, "description");
    this.validatePrice(pricePerNight);
    this.validateText(location, "location");
    this.validateText(address, "address");
    this.validateNonNegativeInteger(bedrooms, "bedrooms");
    this.validateNonNegativeInteger(bathrooms, "bathrooms");
    this.validatePositiveInteger(maxGuests, "maxGuests");
    this.validateArray(images, "images");
    this.validateArray(amenities, "amenities");
    this.validateStatus(status);

    this.propertyNumber = propertyNumber.trim();
    this.title = title.trim();
    this.description = description.trim();
    this.pricePerNight = pricePerNight;
    this.location = location.trim();
    this.address = address.trim();
    this.bedrooms = bedrooms;
    this.bathrooms = bathrooms;
    this.maxGuests = maxGuests;
    this.images = [...images];
    this.amenities = [...amenities];
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  touch() {
    this.updatedAt = new Date();
  }

  markAsBooked() {
    if (this.status === property_status.maintenance)
      throw new Error("Property under maintenance cannot be booked");

    this.status = property_status.booked;
    this.touch();
  }

  markAsAvailable() {
    if (this.status === property_status.maintenance)
      throw new Error("Property under maintenance");

    this.status = property_status.available;
    this.touch();
  }

  markAsMaintenance() {
    this.status = property_status.maintenance;
    this.touch();
  }

  validatePropertyNumber(propertyNumber) {
    if (typeof propertyNumber !== "string" || !propertyNumber.trim()) {
      throw new Error("Property number is required");
    }
  }

  validateText(value, fieldName) {
    if (typeof value !== "string" || !value.trim())
      throw new Error(`${fieldName} is required`);
  }

  validatePrice(value) {
    if (!Number.isFinite(value) || value < 0)
      throw new Error("pricePerNight must be a positive number");
  }

  validateNonNegativeInteger(value, fieldName) {
    if (!Number.isInteger(value) || value < 0)
      throw new Error(`${fieldName} must be a positive integer`);
  }

  validatePositiveInteger(value, fieldName) {
    if (!Number.isInteger(value) || value <= 0)
      throw new Error(`${fieldName} must be a positive integer`);
  }

  validateArray(value, fieldName) {
    if (!Array.isArray(value)) throw new Error(`${fieldName} must be an array`);
  }

  validateStatus(status) {
    if (!Object.values(property_status).includes(status)) {
      throw new Error(`Invalid property status: ${status}`);
    }
  }
}

export { Property, property_status };
