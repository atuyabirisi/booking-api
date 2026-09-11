class SignInUser {
  constructor({ userRepository, tokenGenerator, passwordService }) {
    this.userRepository = userRepository;
    this.passwordService = passwordService;
    this.tokenGenerator = tokenGenerator;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findUserByEmail(email);
    if (user == null) throw new Error("Invalid email or password");

    const verifiedPassword = await this.passwordService.verifyPassword(
      password,
      user.password,
    );
    if (verifiedPassword === false)
      throw new Error("Invalid email or password");

    const token = await this.tokenGenerator.generateAuthToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return token;
  }
}

export default SignInUser;
