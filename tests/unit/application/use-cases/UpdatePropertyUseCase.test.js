import { jest } from "@jest/globals";
import UpdatePropertyUseCase from "../../../../src/application/use-cases/property/UpdatePropertyUseCase.js";

describe("UpdatePropertyUseCase", () => {
  let propertyRepository;
  let imageStorage;
  let updatePropertyUseCase;

  beforeEach(() => {
    propertyRepository = {
      findByPropertyNumber: jest.fn(),
      updateProperty: jest.fn(),
    };

    imageStorage = {
      uploadImages: jest.fn(),
    };

    updatePropertyUseCase = new UpdatePropertyUseCase(
      propertyRepository,
      imageStorage,
    );
  });

  it("should update a property with existing and new images", async () => {
    const propertyNumber = "B2";

    const updateData = {
      title: "Updated Deluxe Apartment",
      pricePerNight: 6000,
    };

    const imagesToKeep = ["https://cloudinary.com/existing-bedroom.jpg"];

    const newImages = [{ originalname: "new-living-room.jpg" }];

    propertyRepository.findByPropertyNumber.mockResolvedValue({
      propertyNumber: "B2",
      title: "Deluxe Apartment",
    });

    imageStorage.uploadImages.mockResolvedValue([
      "https://cloudinary.com/new-living-room.jpg",
    ]);

    propertyRepository.updateProperty.mockResolvedValue({
      propertyNumber: "B2",
      title: "Updated Deluxe Apartment",
    });

    const result = await updatePropertyUseCase.execute(
      propertyNumber,
      updateData,
      imagesToKeep,
      newImages,
    );

    expect(propertyRepository.findByPropertyNumber).toHaveBeenCalledWith("B2");

    expect(imageStorage.uploadImages).toHaveBeenCalledWith(newImages);

    expect(propertyRepository.updateProperty).toHaveBeenCalledWith("B2", {
      title: "Updated Deluxe Apartment",
      pricePerNight: 6000,
      images: [
        "https://cloudinary.com/existing-bedroom.jpg",
        "https://cloudinary.com/new-living-room.jpg",
      ],
    });

    expect(result).toEqual({
      propertyNumber: "B2",
      title: "Updated Deluxe Apartment",
    });
  });

  it("should update a property without uploading images when no new images are provided", async () => {
    const propertyNumber = "B3";

    const updateData = {
      title: "Updated Family Apartment",
      pricePerNight: 6500,
    };

    const imagesToKeep = [
      "https://cloudinary.com/bedroom.jpg",
      "https://cloudinary.com/living-room.jpg",
    ];

    const newImages = [];

    propertyRepository.findByPropertyNumber.mockResolvedValue({
      propertyNumber: "B3",
      title: "Family Apartment",
    });

    propertyRepository.updateProperty.mockResolvedValue({
      propertyNumber: "B3",
      title: "Updated Family Apartment",
    });

    const result = await updatePropertyUseCase.execute(
      propertyNumber,
      updateData,
      imagesToKeep,
      newImages,
    );

    expect(imageStorage.uploadImages).not.toHaveBeenCalled();

    expect(propertyRepository.updateProperty).toHaveBeenCalledWith("B3", {
      title: "Updated Family Apartment",
      pricePerNight: 6500,
      images: [
        "https://cloudinary.com/bedroom.jpg",
        "https://cloudinary.com/living-room.jpg",
      ],
    });

    expect(result).toEqual({
      propertyNumber: "B3",
      title: "Updated Family Apartment",
    });
  });

  it("should throw an error when the property does not exist", async () => {
    propertyRepository.findByPropertyNumber.mockResolvedValue(null);

    await expect(
      updatePropertyUseCase.execute(
        "B99",
        { title: "Updated Property" },
        [],
        [],
      ),
    ).rejects.toThrow("Property with number B99 not found");

    expect(propertyRepository.findByPropertyNumber).toHaveBeenCalledWith("B99");

    expect(imageStorage.uploadImages).not.toHaveBeenCalled();

    expect(propertyRepository.updateProperty).not.toHaveBeenCalled();
  });
});
