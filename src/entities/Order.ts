import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from './enum/OrderStatus';

export interface OrderItem {
  productId: string;
  quantity: number;
}

export class Order {
  id: string;
  userId: string;
  description: string;
  totalPrice: number;
  status: OrderStatus;
  products: OrderItem[];

  constructor(userId: string, products: OrderItem[], description = '') {
    this.id = uuidv4();
    this.userId = userId;
    this.products = products;
    this.description = description;
    this.status = OrderStatus.PENDING;
    this.totalPrice = 0; 
  }
}
