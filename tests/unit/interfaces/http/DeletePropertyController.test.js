import { jest } from "@jest/globals";
import DeletePropertyController from "../../../../src/interfaces/http/controllers/property/DeletePropertyController";

describe("DeletePropertyController", () => {
  let deletePropertyUseCase, logger, controller, req, res;

  beforeEach(() => {
    deletePropertyUseCase = {
      execute: jest.fn(),
    };

    logger = {
      error: jest.fn(),
    };

    controller = new DeletePropertyController(deletePropertyUseCase, logger);

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

  it("should delete a property successfully", async () => {
    const result = {
      propertyNumber: "B2",
      message: "Property deleted successfully",
    };

    deletePropertyUseCase.execute.mockResolvedValue(result);

    await controller.deleteProperty(req, res);

    expect(deletePropertyUseCase.execute).toHaveBeenCalledWith("B2");

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Property deleted successfully",
      data: {
        propertyNumber: "B2",
      },
    });
  });

  it("should return 404 when the property cannot be deleted", async () => {
    const error = new Error("Property with number B99 not found");

    req.params.propertyNumber = "B99";

    deletePropertyUseCase.execute.mockRejectedValue(error);

    await controller.deleteProperty(req, res);

    expect(deletePropertyUseCase.execute).toHaveBeenCalledWith("B99");

    expect(logger.error).toHaveBeenCalledWith(
      expect.stringContaining("Delete property failed:"),
    );

    expect(res.status).toHaveBeenCalledWith(404);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Property with number B99 not found",
    });
  });
});
