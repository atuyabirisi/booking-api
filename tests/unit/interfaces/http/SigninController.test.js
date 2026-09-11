import { jest } from "@jest/globals";
import SigninController from "../../../../src/interfaces/http/controllers/SigninController.js";

describe("SigninController", () => {
  let signinUser;
  let logger;
  let signinController;
  let req;
  let res;

  beforeEach(() => {
    signinUser = {
      execute: jest.fn(),
    };

    logger = {
      error: jest.fn(),
    };

    signinController = new SigninController(signinUser, logger);

    req = {
      body: {
        email: "iAtuya@example.com",
        password: "Password123",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should return 200 and the auth token when signin is successful", async () => {
    signinUser.execute.mockResolvedValue("auth-token");

    await signinController.signin(req, res);

    expect(signinUser.execute).toHaveBeenCalledWith({
      email: "iAtuya@example.com",
      password: "Password123",
    });

    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: "auth-token",
    });

    expect(logger.error).not.toHaveBeenCalled();
  });

  it("should return 400 and log the error when signin fails", async () => {
    const error = new Error("Invalid email or password");
    error.stack = "Error: Invalid email or password";

    signinUser.execute.mockRejectedValue(error);

    await signinController.signin(req, res);

    expect(logger.error).toHaveBeenCalledWith(`Signin failed: ${error.stack}`);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Invalid email or password",
    });
  });
});
