import SignupUser from "../../application/use-cases/SignupUser.js";
import SiginInUser from "../../application/use-cases/SignInUser.js";
import CreatePropertyUsecase from "../../application/use-cases/property/CreatePropertyUseCase.js";
import MongoUserRepository from "../db/repositories/MongoUserRepository.js";
import SignupController from "../../interfaces/http/controllers/SignupController.js";
import SigninController from "../../interfaces/http/controllers/SigninController.js";
import CreatePropertyController from "../../interfaces/http/controllers/property/CreatePropertyController.js";
import JwtService from "../services/JwtService.js";
import BcryptPasswordService from "../services/BcryptPasswordService.js";
import WinstonLogger from "../services/WinstonLogger.js";
import CloudinaryImageStorage from "../services/CloudinaryStorageService.js";
import MongoPropertyRepository from "../db/repositories/MongoPropertyRepository.js";

const logger = new WinstonLogger();
const passwordService = new BcryptPasswordService();
const imageStorage = new CloudinaryImageStorage();
const tokenGenerator = new JwtService(
  process.env.JWT_SECRET,
  process.env.JWT_EXPIRES_IN,
  logger,
);

const userRepository = new MongoUserRepository();
const propertyRepository = new MongoPropertyRepository();

const signupUser = new SignupUser(userRepository, passwordService);
const signinUser = new SiginInUser({
  userRepository,
  tokenGenerator,
  passwordService,
});
const createProperty = new CreatePropertyUsecase(
  propertyRepository,
  imageStorage,
);

const signupController = new SignupController(signupUser, logger);
const signinController = new SigninController(signinUser, logger);
const createPropertyController = new CreatePropertyController(
  createProperty,
  logger,
);

export { signupController, signinController, createPropertyController };
