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

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

/* app.use(express.json()); */

// Enable CORS for client route 5173
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
  })
);

app.use(cookieParser());

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
