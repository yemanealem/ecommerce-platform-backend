import { IProductRepository } from "../../interfaces/repositories/IProductRepository";
import { Product } from "../../entities/Product";
import { ProductValidation } from "../../utils/product.validation";

export class UpdateProductUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute(productId: string, data: Partial<Product>): Promise<Product> {
    if (data.name) ProductValidation.validateName(data.name);
    if (data.description) ProductValidation.validateDescription(data.description);
    if (data.price !== undefined) ProductValidation.validatePrice(data.price);
    if (data.stock !== undefined) ProductValidation.validateStock(data.stock);

    const updated = await this.productRepo.update(productId, data);
    if (!updated) throw new Error("Product not found");
    return updated;
  }
}
