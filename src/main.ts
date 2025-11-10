import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ message: "E-commerce Platform Backend is running 🚀" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
