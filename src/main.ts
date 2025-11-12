import express from "express";
import dotenv from "dotenv";
import connectDB from "./frameworks/db/mongo";
import authRoutes from './frameworks/http/routes/authRoutes';
import productRoute from './frameworks/http/routes/productRoutes';
import orderRoute from './frameworks/http/routes/orderRoutes';

dotenv.config();
const app = express();

connectDB();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoute);
app.use('/orders',orderRoute);

app.get("/", (req, res) => {
  res.send("Server is running with MongoDB connection!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
