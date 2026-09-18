import { jest } from "@jest/globals";
import DeletePropertyUseCase from "../../../../src/application/use-cases/property/DeletePropertyUseCase.js";

describe("DeletePropertyUseCase", () => {
  let propertyRepository, deletePropertyUseCase;

  beforeEach(() => {
    propertyRepository = {
      findByPropertyNumber: jest.fn(),
      deleteProperty: jest.fn(),
    };

    deletePropertyUseCase = new DeletePropertyUseCase(propertyRepository);
  });

  it("should delete a property successfully", async () => {
    const propertyNumber = "B2";

    propertyRepository.findByPropertyNumber.mockResolvedValue({
      propertyNumber: "B2",
      title: "Deluxe Apartment",
    });

    propertyRepository.deleteProperty.mockResolvedValue({
      propertyNumber: "B2",
    });

    const result = await deletePropertyUseCase.execute(propertyNumber);

    expect(propertyRepository.findByPropertyNumber).toHaveBeenCalledWith("B2");

    expect(propertyRepository.deleteProperty).toHaveBeenCalledWith("B2");

    expect(result).toEqual({
      propertyNumber: "B2",
      message: "Property deleted successfully",
    });
  });

  it("should throw an error when the property does not exist", async () => {
    propertyRepository.findByPropertyNumber.mockResolvedValue(null);

    await expect(deletePropertyUseCase.execute("B99")).rejects.toThrow(
      "Property with number B99 not found",
    );

    expect(propertyRepository.findByPropertyNumber).toHaveBeenCalledWith("B99");

    expect(propertyRepository.deleteProperty).not.toHaveBeenCalled();
  });
});
