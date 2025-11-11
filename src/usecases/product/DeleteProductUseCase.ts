import { IProductRepository } from "../../interfaces/repositories/IProductRepository";

export class DeleteProductUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute(productId: string): Promise<void> {
    const product = await this.productRepo.findById(productId);
    if (!product) throw new Error("Product not found");

    await this.productRepo.delete(productId);
  }
}
