import express from "express";
import { createPropertyController } from "../../../infrastructure/bootstrap/container.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  upload.array("images", 8),

  createPropertyController.createProperty.bind(createPropertyController),
);

export default router;
