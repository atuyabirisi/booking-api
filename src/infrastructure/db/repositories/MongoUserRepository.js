import UserRepository from "../../../application/repositories/UserRepository.js";
import UserModel from "../models/UserModel.js";
import User from "../../../domain/entities/User.js";

class MongoUserRepository extends UserRepository {
  async findByEmail(email) {
    const user = await UserModel.findOne({ email });

    if (!user) return null;

    return new User({
      id: user._id.toString(),
    });
  }

  async save(user) {
    const createdUser = await UserModel.create({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    });

    return new User({
      id: createdUser._id.toString(),
      name: createdUser.name,
      email: createdUser.email,
      phone: createdUser.phone,
      password: createdUser.password,
      role: createdUser.role,
    });
  }
}

export default MongoUserRepository;
