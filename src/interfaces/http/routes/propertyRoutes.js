import express from "express";
import {
  createPropertyController,
  updatePropertyController,
  getPropertyController,
  deletePropertyController,
} from "../../../infrastructure/bootstrap/container.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  upload.array("images", 8),
  createPropertyController.createProperty.bind(createPropertyController),
);

router.get(
  "/:propertyNumber",
  getPropertyController.getProperty.bind(getPropertyController),
);

router.patch(
  "/:propertyNumber",
  upload.array("images", 8),
  updatePropertyController.updateProperty.bind(updatePropertyController),
);

router.delete(
  "/:propertyNumber",
  deletePropertyController.deleteProperty.bind(deletePropertyController),
);

export default router;
