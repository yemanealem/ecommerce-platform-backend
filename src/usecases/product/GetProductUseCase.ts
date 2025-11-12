import { IProductRepository } from "../../interfaces/repositories/IProductRepository";
import { Product } from "../../entities/Product";

export interface GetProductsInput {
  page: number;
  limit: number;
  search?: string;
}

export class GetProductUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute({ page, limit, search }: GetProductsInput): Promise<{ products: Product[]; total: number }> {
    return this.productRepo.findAll(page, limit, search);
  }

  async getById(productId:any ): Promise<Product | null> {
    return this.productRepo.findById(productId);
  }

}
