import express from "express";
import authRoutes from "./interfaces/http/routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;
