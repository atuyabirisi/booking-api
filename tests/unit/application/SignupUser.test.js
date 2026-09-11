import { jest } from "@jest/globals";
import SignupUser from "../../../src/application/use-cases/SignupUser.js";

describe("SignupUser", () => {
  let userRepository;
  let passwordService;
  let signupUser;

  beforeEach(() => {
    userRepository = {
      findUserByEmail: jest.fn(),
      saveUser: jest.fn(),
    };

    passwordService = {
      hash: jest.fn(),
    };

    signupUser = new SignupUser(userRepository, passwordService);
  });

  it("should successfully sign up a user", async () => {
    userRepository.findUserByEmail.mockResolvedValue(null);

    passwordService.hash.mockResolvedValue("hashed-password");

    userRepository.saveUser.mockResolvedValue({
      id: "123",
      name: "iAtuya",
      email: "iAtuya@example.com",
      phone: "0798248825",
      password: "hashed-password",
      role: "USER",
    });

    const result = await signupUser.execute({
      name: "iAtuya",
      email: "iAtuya@example.com",
      phone: "0798248825",
      password: "Password123",
    });

    expect(result).toEqual({
      id: "123",
      name: "iAtuya",
      email: "iAtuya@example.com",
      phone: "0798248825",
      role: "USER",
    });

    expect(passwordService.hash).toHaveBeenCalledWith("Password123");

    expect(userRepository.saveUser).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "iAtuya",
        email: "iAtuya@example.com",
        phone: "0798248825",
        password: "hashed-password",
      }),
    );
  });

  it("should reject signup when the email already exists", async () => {
    userRepository.findUserByEmail.mockResolvedValue({
      id: "existing-user",
      email: "iAtuya@example.com",
    });

    await expect(
      signupUser.execute({
        name: "iAtuya",
        email: "iAtuya@example.com",
        phone: "0798248825",
        password: "Password123",
      }),
    ).rejects.toThrow("User with this email already exists");

    expect(passwordService.hash).not.toHaveBeenCalled();
    expect(userRepository.saveUser).not.toHaveBeenCalled();
  });

  it("should propagate an error when saving the user fails", async () => {
    userRepository.findUserByEmail.mockResolvedValue(null);

    passwordService.hash.mockResolvedValue("hashed-password");

    userRepository.saveUser.mockRejectedValue(new Error("Failed to save user"));

    await expect(
      signupUser.execute({
        name: "iAtuya",
        email: "iAtuya@example.com",
        phone: "0798248825",
        password: "Password123",
      }),
    ).rejects.toThrow("Failed to save user");
  });
});
