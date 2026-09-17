import express from "express";
import {
  createPropertyController,
  updatePropertyController,
} from "../../../infrastructure/bootstrap/container.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  upload.array("images", 8),
  createPropertyController.createProperty.bind(createPropertyController),
);

router.patch(
  "/:propertyNumber",
  upload.array("images", 8),
  updatePropertyController.updateProperty.bind(updatePropertyController),
);

export default router;
