import { IProductRepository } from "../../interfaces/repositories/IProductRepository";
import { Product } from "../../entities/Product";

export class GetProductUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute(productId: string): Promise<Product> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new Error("Product not found");
    return product;
  }
}
