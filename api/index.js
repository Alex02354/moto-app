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
import { fileURLToPath } from "url";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS for client route 5173
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
  })
);

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Wishlist Schema and Model
const wishlistSchema = new mongoose.Schema({
  _id: String,
  image: String,
  title: String,
  userID: String,
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// Wishlist Routes
app.get("/api/wishlist", async (req, res, next) => {
  try {
    const items = await Wishlist.find();
    res.json(items);
  } catch (err) {
    next(err);
  }
});

app.post("/api/wishlist", async (req, res, next) => {
  try {
    const newItem = new Wishlist(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    next(err);
  }
});

app.delete("/api/wishlist/:id", async (req, res, next) => {
  try {
    await Wishlist.deleteOne({ _id: req.params.id });
    res.json({ message: "Item deleted" });
  } catch (err) {
    next(err);
  }
});

app.delete("/api/wishlist", async (req, res, next) => {
  try {
    await Wishlist.deleteMany({});
    res.json({ message: "Wishlist cleared" });
  } catch (err) {
    next(err);
  }
});

// API routes
app.use("/api/events", eventRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../dist"))); // Adjust path if needed

// Catch-all route to serve the front-end application
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html")); // Adjust path if needed
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

app.listen(3000, () => {
  console.log("Server listening on port", 3000);
});
