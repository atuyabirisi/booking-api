import express from "express";
import cors from "cors";
import authRoutes from "./interfaces/http/routes/authRoutes.js";
import propertyRoutes from "./interfaces/http/routes/propertyRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

export default app;
