import { Product } from "../../entities/Product";

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  update(productId: string, data: Partial<Product>): Promise<Product | null>;
  delete(productId: string): Promise<void>;
  findById(productId: string): Promise<Product | null>;
  findAll(page: number, limit: number, search?: string): Promise<{products: Product[], total: number}>;
}
