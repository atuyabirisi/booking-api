import express from "express";
import { chatbotController } from "../../../infrastructure/bootstrap/container.js";

const router = express.Router();

router.post("/", chatbotController.chat.bind(chatbotController));

export default router;
