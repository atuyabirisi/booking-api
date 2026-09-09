import { jest } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

import MongoUserRepository from "../../../../../src/infrastructure/db/repositories/MongoUserRepository.js";
import UserModel from "../../../../../src/infrastructure/db/models/UserModel.js";
import User from "../../../../../src/domain/entities/User.js";

describe("MongoUserRepository", () => {
  let mongoServer;
  let repository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  beforeEach(() => {
    repository = new MongoUserRepository();
  });

  afterEach(async () => {
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  describe("findByEmail", () => {
    it("should return the user when the email exists", async () => {
      const createdUser = await UserModel.create({
        name: "iAtuya",
        email: "[iAtuya@test.com](mailto:iAtuya@test.com)",
        phone: "0712345678",
        password: "hashed-password",
      });

      const result = await repository.findByEmail("iAtuya@test.com");

      expect(result).toBeInstanceOf(User);
      expect(result.id).toBe(createdUser._id.toString());
    });

    it("should return null when the email does not exist", async () => {
      const result = await repository.findByEmail("doesnotexist@example.com");

      expect(result).toBeNull();
    });
  });

  describe("save", () => {
    it("should save the user and return the saved domain user", async () => {
      const user = new User({
        name: "Jane Doe",
        email: "[jane@example.com](mailto:jane@example.com)",
        phone: "0723456789",
        password: "hashed-password",
      });

      const result = await repository.save(user);

      expect(result).toBeInstanceOf(User);

      expect(result.id).toBeDefined();
      expect(result.name).toBe("Jane Doe");
      expect(result.email).toBe("jane@example.com");
      expect(result.phone).toBe("0723456789");
      expect(result.password).toBe("hashed-password");
      expect(result.role).toBe("USER");

      const savedUser = await UserModel.findOne({
        email: "jane@example.com",
      });

      expect(savedUser).not.toBeNull();
      expect(savedUser.name).toBe("Jane Doe");
      expect(savedUser.email).toBe("jane@example.com");
      expect(savedUser.phone).toBe("0723456789");
      expect(savedUser.password).toBe("hashed-password");
    });
  });
});
