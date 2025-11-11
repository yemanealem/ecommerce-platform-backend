import { IProductRepository } from "../../interfaces/repositories/IProductRepository";
import { Product } from "../../entities/Product";
import { ProductValidation } from "../../utils/product.validation";

export class CreateProductUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute(data: {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    userId: string;
  }): Promise<Product> {
    ProductValidation.validateName(data.name);
    ProductValidation.validateDescription(data.description);
    ProductValidation.validatePrice(data.price);
    ProductValidation.validateStock(data.stock);

    const product = new Product(
      data.name,
      data.description,
      data.price,
      data.stock,
      data.category,
      data.userId
    );

    return this.productRepo.create(product);
  }
}
