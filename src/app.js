import express from "express";
import authRoutes from "./interfaces/http/routes/authRoutes.js";
import propertyRoutes from "./interfaces/http/routes/propertyRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

export default app;
