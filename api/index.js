import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/eventRoutes.js";
import bodyParser from "body-parser";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

/* app.use(express.json()); */

app.listen(3000, () => {
  console.log("Server listening on port", 3000);
});

app.use(bodyParser.json());
app.use("/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("<h2>Hello World</h2>");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, reg, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
