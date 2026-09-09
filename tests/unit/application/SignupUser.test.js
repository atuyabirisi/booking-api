import { jest } from "@jest/globals";
import SignupUser from "../../../src/application/use-cases/SignupUser.js";

describe("SignupUser", () => {
  let userRepository;
  let passwordHasher;
  let signupUser;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      save: jest.fn(),
    };

    passwordHasher = {
      hash: jest.fn(),
    };

    signupUser = new SignupUser(userRepository, passwordHasher);
  });

  it("should successfully sign up a user", async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    passwordHasher.hash.mockResolvedValue("hashed-password");

    userRepository.save.mockResolvedValue({
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      phone: "0712345678",
      password: "hashed-password",
      role: "USER",
    });

    const result = await signupUser.execute({
      name: "John Doe",
      email: "john@example.com",
      phone: "0712345678",
      password: "Password123",
    });

    expect(result).toEqual({
      id: "123",
      name: "John Doe",
      email: "john@example.com",
      phone: "0712345678",
      role: "USER",
    });

    expect(passwordHasher.hash).toHaveBeenCalledWith("Password123");

    expect(userRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "John Doe",
        email: "john@example.com",
        phone: "0712345678",
        password: "hashed-password",
      }),
    );
  });

  it("should reject signup when the email already exists", async () => {
    userRepository.findByEmail.mockResolvedValue({
      id: "existing-user",
      email: "[john@example.com](mailto:john@example.com)",
    });

    await expect(
      signupUser.execute({
        name: "John Doe",
        email: "john@example.com",
        phone: "0712345678",
        password: "Password123",
      }),
    ).rejects.toThrow("User with this email already exists");

    expect(passwordHasher.hash).not.toHaveBeenCalled();
    expect(userRepository.save).not.toHaveBeenCalled();
  });

  it("should propagate an error when saving the user fails", async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    passwordHasher.hash.mockResolvedValue("hashed-password");

    userRepository.save.mockRejectedValue(new Error("Failed to save user"));

    await expect(
      signupUser.execute({
        name: "John Doe",
        email: "john@example.com",
        phone: "0712345678",
        password: "Password123",
      }),
    ).rejects.toThrow("Failed to save user");
  });
});
