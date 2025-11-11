import { IProductRepository } from "../../interfaces/repositories/IProductRepository";
import { Product } from "../../entities/Product";
import { paginate } from "../../utils/PaginatedResponseFormatter";

export class SearchProductsUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute(page = 1, limit = 10, search?: string) {
    const { products, total } = await this.productRepo.findAll(page, limit, search);

    return paginate(products, total, page, limit);
  }
}
