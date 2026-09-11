import User from "../../domain/entities/User.js";

class SignupUser {
  constructor(userRepository, passwordService) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
  }

  async execute({ name, email, phone, password }) {
    const existingUser = await this.userRepository.findUserByEmail(email);

    if (existingUser) throw new Error("User with this email already exists");

    const hashedPassword = await this.passwordService.hash(password);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.saveUser(user);

    return {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      phone: savedUser.phone,
      role: savedUser.role,
    };
  }
}

export default SignupUser;
