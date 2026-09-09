import User from "../../domain/entities/User.js";

class SignupUser {
  constructor(userRepository, passwordHasher) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  async execute({ name, email, phone, password }) {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) throw new Error("User with this email already exists");

    const hashedPassword = await this.passwordHasher.hash(password);

    const user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

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
