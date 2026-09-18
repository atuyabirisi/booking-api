import { jest } from "@jest/globals";
import GetPropertyController from "../../../../src/interfaces/http/controllers/property/GetPropertyController.js";

describe("GetPropertyController", () => {
  let getPropertyUseCase, logger, controller, req, res;

  beforeEach(() => {
    getPropertyUseCase = {
      execute: jest.fn(),
    };

    logger = {
      error: jest.fn(),
    };

    controller = new GetPropertyController(getPropertyUseCase, logger);

    req = {
      params: {
        propertyNumber: "B2",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("should return a property successfully", async () => {
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

    getPropertyUseCase.execute.mockResolvedValue(property);

    await controller.getProperty(req, res);

    expect(getPropertyUseCase.execute).toHaveBeenCalledWith("B2");

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: property,
    });
  });

  it("should return 404 when the property is not found", async () => {
    const error = new Error("Property with number B99 not found");

    req.params.propertyNumber = "B99";

    getPropertyUseCase.execute.mockRejectedValue(error);

    await controller.getProperty(req, res);

    expect(getPropertyUseCase.execute).toHaveBeenCalledWith("B99");

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Get property failed:"),
    );

    expect(res.status).toHaveBeenCalledWith(404);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Property with number B99 not found",
    });
  });
});
