import { IOrderRepository } from "../../interfaces/repositories/IOrderRepository";
import { Order } from "../../entities/Order";
import { OrderModel } from "../db/models/OrderModel";

export class OrderRepositoryImpl implements IOrderRepository {
  async create(order: Order): Promise<Order> {
    const created = await OrderModel.create(order);
    return created.toObject() as Order;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const orders = await OrderModel.find({ userId });
    return orders.map(o => o.toObject() as Order);
  }

  async findById(orderId: string): Promise<Order | null> {
    const order = await OrderModel.findById(orderId);
    return order ? (order.toObject() as Order) : null;
  }
}
