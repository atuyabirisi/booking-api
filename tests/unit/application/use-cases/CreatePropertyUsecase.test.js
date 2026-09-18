import { jest } from "@jest/globals";
import CreatePropertyUsecase from "../../../../src/application/use-cases/property/CreatePropertyUseCase.js";

describe("CreatePropertyUsecase", () => {
  let propertyRepository;
  let imageStorage;
  let createPropertyUsecase;

  beforeEach(() => {
    propertyRepository = {
      findByPropertyNumber: jest.fn(),
      saveProperty: jest.fn(),
    };

    imageStorage = {
      uploadImages: jest.fn(),
    };

    createPropertyUsecase = new CreatePropertyUsecase(
      propertyRepository,
      imageStorage,
    );
  });

  it("should create and save a property successfully", async () => {
    const propertyData = {
      propertyNumber: "B2",
      title: "Deluxe Apartment",
      description: "A comfortable apartment",
      pricePerNight: 5500,
      location: "Nyanchwa",
      address: "Nyanchwa, Kisii",
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 4,
      amenities: ["WiFi", "Parking"],
      status: "available",
    };

    const images = [
      { originalname: "bedroom.jpg" },
      { originalname: "living-room.jpg" },
    ];

    propertyRepository.findByPropertyNumber.mockResolvedValue(null);

    imageStorage.uploadImages.mockResolvedValue([
      "https://cloudinary.com/bedroom.jpg",
      "https://cloudinary.com/living-room.jpg",
    ]);

    propertyRepository.saveProperty.mockResolvedValue({
      propertyNumber: "B2",
      title: "Deluxe Apartment",
    });

    const result = await createPropertyUsecase.execute(propertyData, images);

    expect(propertyRepository.findByPropertyNumber).toHaveBeenCalledWith("B2");

    expect(imageStorage.uploadImages).toHaveBeenCalledWith(images);

    expect(propertyRepository.saveProperty).toHaveBeenCalled();

    expect(result).toEqual({
      propertyNumber: "B2",
      title: "Deluxe Apartment",
    });
  });

  it("should throw an error if the property already exists", async () => {
    const propertyData = {
      propertyNumber: "B2",
      title: "Deluxe Apartment",
    };

    propertyRepository.findByPropertyNumber.mockResolvedValue({
      propertyNumber: "B2",
      title: "Existing Apartment",
    });

    await expect(createPropertyUsecase.execute(propertyData)).rejects.toThrow(
      "Property B2 already exists",
    );

    expect(propertyRepository.findByPropertyNumber).toHaveBeenCalledWith("B2");

    expect(imageStorage.uploadImages).not.toHaveBeenCalled();

    expect(propertyRepository.saveProperty).not.toHaveBeenCalled();
  });

  it("should upload images before saving the property", async () => {
    const propertyData = {
      propertyNumber: "B3",
      title: "Family Apartment",
      pricePerNight: 6000,
      location: "Nyanchwa",
      address: "Nyanchwa, Kisii",
      description: "A spacious family apartment in Nyanchwa",
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
      amenities: [],
      status: "available",
    };

    const images = [{ originalname: "house.jpg" }];

    propertyRepository.findByPropertyNumber.mockResolvedValue(null);

    imageStorage.uploadImages.mockResolvedValue([
      "https://cloudinary.com/house.jpg",
    ]);

    propertyRepository.saveProperty.mockResolvedValue({
      propertyNumber: "B3",
      title: "Family Apartment",
    });

    await createPropertyUsecase.execute(propertyData, images);

    expect(imageStorage.uploadImages).toHaveBeenCalledWith(images);

    expect(propertyRepository.saveProperty).toHaveBeenCalledWith(
      expect.objectContaining({
        propertyNumber: "B3",
        title: "Family Apartment",
        images: ["https://cloudinary.com/house.jpg"],
      }),
    );
  });
});
