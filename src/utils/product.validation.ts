export class ProductValidation {
  static validateName(name: string) {
    if (!name || name.length < 3 || name.length > 100) {
      throw new Error("Product name must be between 3 and 100 characters");
    }
  }

  static validateDescription(description: string) {
    if (!description || description.length < 10) {
      throw new Error("Product description must be at least 10 characters long");
    }
  }

  static validatePrice(price: number) {
    if (price === undefined || price <= 0) {
      throw new Error("Price must be a positive number");
    }
  }

  static validateStock(stock: number) {
    if (stock === undefined || stock < 0) {
      throw new Error("Stock must be a non-negative integer");
    }
  }
}
