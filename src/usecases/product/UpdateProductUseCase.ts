import { IProductRepository } from "../../interfaces/repositories/IProductRepository";
import { Product } from "../../entities/Product";
import { ProductValidation } from "../../utils/ProductValidation";

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
}

export class UpdateProductUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute(productId: any, data: UpdateProductInput): Promise<Product | null> {
    if (data.name !== undefined) ProductValidation.validateName(data.name);
    if (data.description !== undefined) ProductValidation.validateDescription(data.description);
    if (data.price !== undefined) ProductValidation.validatePrice(data.price);
    if (data.stock !== undefined) ProductValidation.validateStock(data.stock);

    return this.productRepo.update(productId, data);
  }
}
