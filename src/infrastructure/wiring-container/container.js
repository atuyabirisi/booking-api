import SignupUser from "../../application/use-cases/SignupUser.js";
import MongoUserRepository from "../db/repositories/MongoUserRepository.js";
import AuthController from "../../interfaces/http/controllers/AuthController.js";
import BcryptPasswordHasher from "../security/BcryptPasswordHasher.js";
import WinstonLogger from "../logging/winstonLogger.js";

const userRepository = new MongoUserRepository();
const passwordHasher = new BcryptPasswordHasher();
const logger = new WinstonLogger();

const signupUser = new SignupUser(userRepository, passwordHasher);

const authController = new AuthController(signupUser, logger);

export { authController };
