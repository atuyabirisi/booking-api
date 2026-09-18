import { jest } from "@jest/globals";
import GetPropertyUseCase from "../../../../src/application/use-cases/property/GetPropertyUseCase.js";

describe("GetPropertyUseCase", () => {
  let propertyRepository;
  let getPropertyUseCase;

  beforeEach(() => {
    propertyRepository = {
      findByPropertyNumber: jest.fn(),
    };

    getPropertyUseCase = new GetPropertyUseCase(propertyRepository);
  });

  it("should return a property when it exists", async () => {
    const property = {
      propertyNumber: "B2",
      title: "Deluxe Apartment",
      description: "A comfortable apartment",
      pricePerNight: 5500,
      location: "Nyanchwa",
      address: "Nyanchwa, Kisii",
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 4,
      images: ["https://cloudinary.com/bedroom.jpg"],
      amenities: ["WiFi", "Parking"],
      status: "available",
    };

    propertyRepository.findByPropertyNumber.mockResolvedValue(property);

    const result = await getPropertyUseCase.execute("B2");

    expect(propertyRepository.findByPropertyNumber).toHaveBeenCalledWith("B2");

    expect(result).toEqual({
      propertyNumber: "B2",
      title: "Deluxe Apartment",
      description: "A comfortable apartment",
      pricePerNight: 5500,
      location: "Nyanchwa",
      address: "Nyanchwa, Kisii",
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 4,
      images: ["https://cloudinary.com/bedroom.jpg"],
      amenities: ["WiFi", "Parking"],
      status: "available",
    });
  });

  it("should throw an error when the property does not exist", async () => {
    propertyRepository.findByPropertyNumber.mockResolvedValue(null);

    await expect(getPropertyUseCase.execute("B99")).rejects.toThrow(
      "Property with number B99 not found",
    );

    expect(propertyRepository.findByPropertyNumber).toHaveBeenCalledWith("B99");
  });
});
