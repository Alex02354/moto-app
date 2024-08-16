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
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());

// Wishlist Schema and Model
const wishlistSchema = new mongoose.Schema({
  eventID: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  userID: { type: String, required: true },
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

// Add to Wishlist
app.post("/api/wishlist", async (req, res, next) => {
  try {
    const { eventID, userID } = req.body;
    const existingItem = await Wishlist.findOne({ eventID, userID });

    if (existingItem) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    const newItem = new Wishlist(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

// Remove from Wishlist
app.delete("/api/wishlist/:eventID/:userID", async (req, res, next) => {
  try {
    const { eventID, userID } = req.params;
    const deletedItem = await Wishlist.deleteOne({ eventID, userID });

    if (deletedItem.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    res.json({ message: "Item removed from wishlist" });
  } catch (err) {
    next(err);
  }
});

// Get Wishlist for Current User
app.get("/api/wishlist/:userID", async (req, res, next) => {
  try {
    const { userID } = req.params;
    const wishlistItems = await Wishlist.find({ userID });
    res.json(wishlistItems);
  } catch (err) {
    next(err);
  }
});

// API routes
app.use("/api/events", eventRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../dist")));

// Catch-all route to serve the front-end application
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
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
  console.log("Server listening on port 3000");
});
