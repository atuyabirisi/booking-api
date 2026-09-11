import { jest } from "@jest/globals";
import SignupController from "../../../../src/interfaces/http/controllers/SignupController.js";

describe("SignupController", () => {
  let signupUser;
  let logger;
  let signupController;
  let req;
  let res;

  beforeEach(() => {
    signupUser = {
      execute: jest.fn(),
    };

    logger = {
      error: jest.fn(),
    };

    signupController = new SignupController(signupUser, logger);

    req = {
      body: {
        name: "iAtuya",
        email: "iAtuya@test.com",
        phone: "0712345678",
        password: "Password123",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it("should return 201 with the created user when signup succeeds", async () => {
    const user = {
      id: "123",
      name: "iAtuya",
      email: "iAtuya@test.com",
      phone: "0712345678",
      role: "USER",
    };

    signupUser.execute.mockResolvedValue(user);

    await signupController.signup(req, res);

    expect(signupUser.execute).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: user,
    });
  });

  it("should log the error and return 400 when signup fails", async () => {
    const error = new Error("User with this email already exists");

    signupUser.execute.mockRejectedValue(error);

    await signupController.signup(req, res);

    expect(logger.error).toHaveBeenCalledWith(`Signup failed: ${error.stack}`);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "User with this email already exists",
    });
  });
});
