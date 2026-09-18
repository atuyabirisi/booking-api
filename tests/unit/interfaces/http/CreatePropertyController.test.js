import { jest } from "@jest/globals";
import CreatePropertyController from "../../../../src/interfaces/http/controllers/property/CreatePropertyController.js";

describe("CreatePropertyController", () => {
  let createPropertyUseCase, logger, controller, req, res;

  beforeEach(() => {
    createPropertyUseCase = {
      execute: jest.fn(),
    };

    logger = {
      error: jest.fn(),
    };

    controller = new CreatePropertyController(createPropertyUseCase, logger);

    req = {
      body: {
        propertyNumber: "B2",
        title: "Deluxe Apartment",
        description: "A comfortable apartment",
        pricePerNight: "5500",
        bedrooms: "2",
        bathrooms: "2",
        maxGuests: "4",
        location: "Nyanchwa",
        address: "Nyanchwa, Kisii",
        amenities: ["WiFi", "Parking"],
      },
      files: [{ originalname: "bedroom.jpg" }],
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("should create a property successfully", async () => {
    const createdProperty = {
      propertyNumber: "B2",
      title: "Deluxe Apartment",
    };

    createPropertyUseCase.execute.mockResolvedValue(createdProperty);

    await controller.createProperty(req, res);

    expect(createPropertyUseCase.execute).toHaveBeenCalledWith(
      {
        propertyNumber: "B2",
        title: "Deluxe Apartment",
        description: "A comfortable apartment",
        pricePerNight: 5500,
        bedrooms: 2,
        bathrooms: 2,
        maxGuests: 4,
        location: "Nyanchwa",
        address: "Nyanchwa, Kisii",
        amenities: ["WiFi", "Parking"],
      },
      req.files,
    );

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: createdProperty,
    });
  });

  it("should convert a single amenity into an array", async () => {
    req.body.amenities = "WiFi";

    createPropertyUseCase.execute.mockResolvedValue({
      propertyNumber: "B2",
      title: "Deluxe Apartment",
    });

    await controller.createProperty(req, res);

    expect(createPropertyUseCase.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        amenities: ["WiFi"],
      }),
      req.files,
    );
  });

  it("should use an empty array when no amenities are provided", async () => {
    delete req.body.amenities;

    createPropertyUseCase.execute.mockResolvedValue({
      propertyNumber: "B2",
      title: "Deluxe Apartment",
    });

    await controller.createProperty(req, res);

    expect(createPropertyUseCase.execute).toHaveBeenCalledWith(
      expect.objectContaining({
        amenities: [],
      }),
      req.files,
    );
  });

  it("should return 400 when creating the property fails", async () => {
    const error = new Error("Property already exists");

    createPropertyUseCase.execute.mockRejectedValue(error);

    await controller.createProperty(req, res);

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("CreateProperty failed:"),
    );

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Failed to create property",
    });
  });
});
