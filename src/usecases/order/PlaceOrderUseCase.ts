import { IOrderRepository } from "../../interfaces/repositories/IOrderRepository";
import { IProductRepository } from "../../interfaces/repositories/IProductRepository";
import { Order, OrderItem } from "../../entities/Order";
import { OrderStatus } from "../../entities/enum/OrderStatus";
import mongoose from "mongoose";

export interface PlaceOrderInput {
  userId: string;
  products: { productId: string; quantity: number }[];
  description?: string;
}

export class PlaceOrderUseCase {
  constructor(
    private orderRepo: IOrderRepository,
    private productRepo: IProductRepository
  ) {}

  async execute(input: PlaceOrderInput): Promise<Order> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      let totalPrice = 0;

      // Verify stock for each product
      for (const item of input.products) {
        const product = await this.productRepo.findById(item.productId);

        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }

        totalPrice += product.price * item.quantity;

        // Deduct stock
        product.stock -= item.quantity;
        await this.productRepo.update(product.id, { stock: product.stock });
      }

      const orderItems: OrderItem[] = input.products.map(p => ({
        productId: p.productId,
        quantity: p.quantity,
      }));

      const order = new Order(input.userId, orderItems, input.description);
      order.totalPrice = totalPrice;
      order.status = OrderStatus.PENDING;

      const createdOrder = await this.orderRepo.create(order);

      await session.commitTransaction();
      session.endSession();

      return createdOrder;
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  }
}
