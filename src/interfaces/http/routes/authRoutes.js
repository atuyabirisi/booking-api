import express from "express";
import {
  signupController,
  signinController,
} from "../../../infrastructure/bootstrap/container.js";

const router = express.Router();

router.post("/signup", signupController.signup.bind(signupController));
router.post("/signin", signinController.signin.bind(signinController));

export default router;
