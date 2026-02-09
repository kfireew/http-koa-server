import { ProductModel, Product } from './product.model';

export class ProductRepository {
  async findAll(): Promise<Product[]> {
    return ProductModel.find();
  }

  async findById(id: string): Promise<Product | null> {
    return ProductModel.findById(id);
  }

  async createOne(data: Partial<Product>): Promise<Product> {
    return new ProductModel(data).save();
  }

  async updateById({ id, data }: { id: string; data: Partial<Product> }): Promise<Product | null> {
    return ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id: string): Promise<Product | null> {
    return ProductModel.findByIdAndDelete(id);
  }
}

export const productRepository = new ProductRepository();
