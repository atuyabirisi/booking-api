import express from "express";
import cors from "cors";
import authRoutes from "./interfaces/http/routes/authRoutes.js";
import propertyRoutes from "./interfaces/http/routes/propertyRoutes.js";
import bookingPaymentRoutes from "./interfaces/http/routes/paymentRoutes.js";
import mpesaCallbackRoute from "./interfaces/http/routes/mpesaCallbackRoute.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/payment", bookingPaymentRoutes);
app.use("/api/mpesa", mpesaCallbackRoute);

export default app;
