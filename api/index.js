import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/eventRoutes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your frontend URL
app.use(
  cors({
    origin: "https://moto-app.onrender.com",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, "client", "dist")));

app.use("/events", eventRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Catch-all handler to serve the frontend's index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
