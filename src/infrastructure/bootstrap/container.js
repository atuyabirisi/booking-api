import SignupUser from "../../application/use-cases/SignupUser.js";
import SiginInUser from "../../application/use-cases/SignInUser.js";
import CreatePropertyUsecase from "../../application/use-cases/property/CreatePropertyUseCase.js";
import UpdatePropertyUseCase from "../../application/use-cases/property/UpdatePropertyUseCase.js";
import GetPropertyUseCase from "../../application/use-cases/property/GetPropertyUseCase.js";
import DeletePropertyUseCase from "../../application/use-cases/property/DeletePropertyUseCase.js";
import InitiateBookingPaymentUseCase from "../../application/use-cases/booking/InitiateBookingPaymentUseCase.js";
import HandleMpesaCallbackUseCase from "../../application/use-cases/booking/HandleMpesaCallbackUseCase.js";

import SignupController from "../../interfaces/http/controllers/SignupController.js";
import SigninController from "../../interfaces/http/controllers/SigninController.js";
import CreatePropertyController from "../../interfaces/http/controllers/property/CreatePropertyController.js";
import UpdatePropertyController from "../../interfaces/http/controllers/property/UpdatePropertyController.js";
import GetPropertyController from "../../interfaces/http/controllers/property/GetPropertyController.js";
import DeletePropertyController from "../../interfaces/http/controllers/property/DeletePropertyController.js";
import InitiateBookingPaymentController from "../../interfaces/http/controllers/booking/InitiateBookingPaymentController.js";
import MpesaCallbackController from "../../interfaces/http/controllers/booking/MpesaCallbackController.js";

import JwtService from "../services/JwtService.js";
import BcryptPasswordService from "../services/BcryptPasswordService.js";
import WinstonLogger from "../services/WinstonLogger.js";
import CloudinaryImageStorage from "../services/CloudinaryStorageService.js";
import MpesaPaymentGateway from "../payments/MpesaPaymentGateway.js";

import MongoUserRepository from "../db/repositories/MongoUserRepository.js";
import MongoPropertyRepository from "../db/repositories/MongoPropertyRepository.js";
import MongoPaymentRepository from "../db/repositories/MongoPaymentRepository.js";
import MongoBookingRepository from "../db/repositories/MongoBookingRepository.js";

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
const paymentRepository = new MongoPaymentRepository();
const bookingRepository = new MongoBookingRepository();

const paymentGateway = new MpesaPaymentGateway({
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  businessShortCode: process.env.MPESA_BUSINESS_SHORT_CODE,
  passkey: process.env.MPESA_PASSKEY,
  callbackUrl: process.env.MPESA_CALLBACK_URL,
});

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
const updateExistingProperty = new UpdatePropertyUseCase(
  propertyRepository,
  imageStorage,
);
const getProperty = new GetPropertyUseCase(propertyRepository);
const deleteProperty = new DeletePropertyUseCase(propertyRepository);
const initiateBookingPayment = new InitiateBookingPaymentUseCase(
  propertyRepository,
  paymentRepository,
  paymentGateway,
);
const handleMpesaCallback = new HandleMpesaCallbackUseCase(
  paymentRepository,
  bookingRepository,
  logger,
);

const signupController = new SignupController(signupUser, logger);
const signinController = new SigninController(signinUser, logger);
const getPropertyController = new GetPropertyController(getProperty, logger);
const deletePropertyController = new DeletePropertyController(
  deleteProperty,
  logger,
);
const createPropertyController = new CreatePropertyController(
  createProperty,
  logger,
);
const updatePropertyController = new UpdatePropertyController(
  updateExistingProperty,
  logger,
);
const initiateBookingController = new InitiateBookingPaymentController(
  initiateBookingPayment,
  logger,
);
const handleMpesaCallbackController = new MpesaCallbackController(
  handleMpesaCallback,
  logger,
);

export {
  signupController,
  signinController,
  createPropertyController,
  updatePropertyController,
  getPropertyController,
  deletePropertyController,
  initiateBookingController,
  handleMpesaCallbackController,
};
