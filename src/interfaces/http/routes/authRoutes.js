import express from "express";
import { authController } from "../../../infrastructure/wiring-container/container.js";

const router = express.Router();

router.post("/signup", authController.signup.bind(authController));

export default router;
