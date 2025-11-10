import { v4 as uuidv4 } from 'uuid';

export class Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  userId: string; 

  constructor(name: string, description: string, price: number, stock: number, category: string, userId: string) {
    this.id = uuidv4();
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.category = category;
    this.userId = userId;
  }
}
