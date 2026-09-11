import { jest } from "@jest/globals";
import SignInUser from "../../../../src/application/use-cases/SignInUser";

describe("SignInUser", () => {
  let signInUser;
  let userRepository;
  let passwordService;
  let tokenGenerator;

  beforeEach(() => {
    userRepository = {
      findUserByEmail: jest.fn(),
    };

    passwordService = {
      verifyPassword: jest.fn(),
    };

    tokenGenerator = {
      generateAuthToken: jest.fn(),
    };

    signInUser = new SignInUser({
      userRepository,
      passwordService,
      tokenGenerator,
    });
  });

  it("should sign in the user and return an auth token", async () => {
    const user = {
      id: "123",
      name: "iAtuya",
      email: "iAtuya@example.com",
      phone: "0798248825",
      password: "hashed-password",
      role: "USER",
    };

    userRepository.findUserByEmail.mockResolvedValue(user);
    passwordService.verifyPassword.mockResolvedValue(true);
    tokenGenerator.generateAuthToken.mockResolvedValue("auth-token");

    const result = await signInUser.execute({
      email: "iAtuya@example.com",
      password: "Password123",
    });

    expect(result).toBe("auth-token");

    expect(userRepository.findUserByEmail).toHaveBeenCalledWith(
      "iAtuya@example.com",
    );

    expect(passwordService.verifyPassword).toHaveBeenCalledWith(
      "Password123",
      "hashed-password",
    );

    expect(tokenGenerator.generateAuthToken).toHaveBeenCalledWith({
      id: "123",
      email: "iAtuya@example.com",
      role: "USER",
    });
  });

  it("should reject when the user does not exist", async () => {
    userRepository.findUserByEmail.mockResolvedValue(null);

    await expect(
      signInUser.execute({
        email: "iAtuya@example.com",
        password: "Password123",
      }),
    ).rejects.toThrow("Invalid email or password");

    expect(passwordService.verifyPassword).not.toHaveBeenCalled();
    expect(tokenGenerator.generateAuthToken).not.toHaveBeenCalled();
  });

  it("should reject when the password is incorrect", async () => {
    const user = {
      id: "123",
      email: "iAtuya@example.com",
      password: "hashed-password",
      role: "USER",
    };

    userRepository.findUserByEmail.mockResolvedValue(user);
    passwordService.verifyPassword.mockResolvedValue(false);

    await expect(
      signInUser.execute({
        email: "iAtuya@example.com",
        password: "WrongPassword",
      }),
    ).rejects.toThrow("Invalid email or password");

    expect(tokenGenerator.generateAuthToken).not.toHaveBeenCalled();
  });

  it("should propagate an error when token generation fails", async () => {
    const user = {
      id: "123",
      email: "iAtuya@example.com",
      password: "hashed-password",
      role: "USER",
    };

    userRepository.findUserByEmail.mockResolvedValue(user);
    passwordService.verifyPassword.mockResolvedValue(true);

    tokenGenerator.generateAuthToken.mockRejectedValue(
      new Error("Failed to generate token"),
    );

    await expect(
      signInUser.execute({
        email: "iAtuya@example.com",
        password: "Password123",
      }),
    ).rejects.toThrow("Failed to generate token");
  });
});
