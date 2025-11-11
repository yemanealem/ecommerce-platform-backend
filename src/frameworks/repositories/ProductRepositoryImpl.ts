import { IProductRepository } from "../../interfaces/repositories/IProductRepository";
import { Product } from "../../entities/Product";
import { ProductModel } from "../db/models/ProductModel";

export class ProductRepositoryImpl implements IProductRepository {
  async create(product: Product): Promise<Product> {
    const created = await ProductModel.create(product);
    return created.toObject() as Product;
  }

  async update(productId: string, data: Partial<Product>): Promise<Product | null> {
    const updated = await ProductModel.findByIdAndUpdate(productId, data, { new: true });
    return updated ? (updated.toObject() as Product) : null;
  }

  async delete(productId: string): Promise<void> {
    await ProductModel.findByIdAndDelete(productId);
  }

  async findById(productId: string): Promise<Product | null> {
    const product = await ProductModel.findById(productId);
    return product ? (product.toObject() as Product) : null;
  }

  async findAll(page: number, limit: number, search?: string): Promise<{products: Product[], total: number}> {
    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    const products = await ProductModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await ProductModel.countDocuments(query);
    return { products: products.map(p => p.toObject() as Product), total };
  }
}
