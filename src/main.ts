import express from "express";
import dotenv from "dotenv";
import connectDB from "./frameworks/db/mongo";
import authRoutes from './frameworks/http/routes/authRoutes';


dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use('/auth', authRoutes);
app.get("/", (req, res) => {
  res.send("Server is running with MongoDB connection!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
