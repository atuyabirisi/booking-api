import SignupUser from "../../application/use-cases/SignupUser.js";
import SiginInUser from "../../application/use-cases/SignInUser.js";
import MongoUserRepository from "../db/repositories/MongoUserRepository.js";
import SignupController from "../../interfaces/http/controllers/SignupController.js";
import SigninController from "../../interfaces/http/controllers/SigninController.js";
import JwtService from "../services/JwtService.js";
import BcryptPasswordService from "../services/BcryptPasswordService.js";
import WinstonLogger from "../services/WinstonLogger.js";

const logger = new WinstonLogger();

const userRepository = new MongoUserRepository();

const passwordService = new BcryptPasswordService();

const tokenGenerator = new JwtService(
  process.env.JWT_SECRET,
  process.env.JWT_EXPIRES_IN,
  logger,
);

const signupUser = new SignupUser(userRepository, passwordService);

const signinUser = new SiginInUser({
  userRepository,
  tokenGenerator,
  passwordService,
});

const signupController = new SignupController(signupUser, logger);
const signinController = new SigninController(signinUser, logger);

export { signupController, signinController };
