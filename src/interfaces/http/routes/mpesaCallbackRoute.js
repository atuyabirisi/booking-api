import express from "express";
import { handleMpesaCallbackController } from "../../../infrastructure/bootstrap/container.js";

const router = express.Router();

router.post(
  "/callback",
  handleMpesaCallbackController.handleCallback.bind(
    handleMpesaCallbackController,
  ),
);

export default router;
