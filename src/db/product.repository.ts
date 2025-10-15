import { ProductModel, Product } from './product.model';
import { assertFound, ProductContext } from '../utils';

export class ProductRepository {
  public static async findAll(): Promise<Product[]> {
    return ProductModel.find();
  }

  public static async findById(ctx: ProductContext): Promise<Product> {
    const product: Product | null = await ProductModel.findById(ctx.params.id);
    return assertFound(product, ctx);
  }

  public static async createOne(data: Partial<Product>): Promise<Product> {
    return new ProductModel(data).save();
  }

  public static async updateById(ctx: ProductContext): Promise<Product> {
    const product: Product | null = await ProductModel.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
      {
        new: true
      }
    );
    return assertFound(product, ctx);
  }

  public static async deleteById(ctx: ProductContext): Promise<Product> {
    const product: Product | null = await ProductModel.findByIdAndDelete(ctx.params.id);
    return assertFound(product, ctx);
  }
}
