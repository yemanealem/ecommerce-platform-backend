import { Order } from "../../entities/Order";

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findByUserId(userId: string): Promise<Order[]>;
  findById(orderId: string): Promise<Order | null>;
}
