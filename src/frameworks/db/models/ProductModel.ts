import { Schema, model, Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface IProduct extends Document {
  id:string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    id: { type: String, default: () => uuidv4(), unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const ProductModel = model<IProduct>("Product", productSchema);
