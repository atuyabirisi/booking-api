import express from "express";
import { initiateBookingController } from "../../../infrastructure/bootstrap/container.js";

const router = express.Router();

router.post(
  "/initiate",
  initiateBookingController.initiatePayment.bind(initiateBookingController),
);

export default router;
