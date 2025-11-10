import { Schema, model, Document } from "mongoose";
import { OrderStatus } from "../../../entities/enums";

export interface IOrderItem {
  productId: string;
  quantity: number;
}

export interface IOrder extends Document {
  userId: string;
  description: string;
  totalPrice: number;
  status: OrderStatus;
  products: IOrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    description: { type: String, default: "" },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PENDING },
    products: { type: [orderItemSchema], required: true },
  },
  { timestamps: true }
);

export const OrderModel = model<IOrder>("Order", orderSchema);
