import { ProductModel, Product } from './product.model';

export class ProductService {
  public static async findAll(): Promise<Product[]> {
    return ProductModel.find();
  }

  public static async findById(id: string): Promise<Product | null> {
    return ProductModel.findById(id);
  }

  public static async createOne(data: Partial<Product>): Promise<Product> {
    const product = new ProductModel(data);
    return product.save();
  }

  public static async updateById(id: string, data: Partial<Product>): Promise<Product | null> {
    return ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  public static async deleteById(id: string): Promise<Product | null> {
    return ProductModel.findByIdAndDelete(id);
  }
}
