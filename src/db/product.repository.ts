import { ProductModel, Product } from './product.model';
import { assertFound, assertFoundGQL, ProductContext } from '../utils';

export class ProductRepository {
  public static async findAll(): Promise<Product[]> {
    return ProductModel.find();
  }

  public static async findByIdHttp(ctx: ProductContext): Promise<Product> {
    const product: Product | null = await ProductModel.findById(ctx.params.id);
    return assertFound(product, ctx);
  }

  public static async findByIdGQL(id: string): Promise<Product> {
    const product: Product | null = await ProductModel.findById(id);
    return assertFoundGQL(product);
  }

  public static async createOne(data: Partial<Product>): Promise<Product> {
    return new ProductModel(data).save();
  }

  public static async updateByIdHttp(ctx: ProductContext): Promise<Product> {
    const product: Product | null = await ProductModel.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body,
      {
        new: true
      }
    );
    return assertFound(product, ctx);
  }

  public static async updateByIdGQL({
    id,
    data
  }: {
    id: string;
    data: Partial<Product>;
  }): Promise<Product> {
    const product: Product | null = await ProductModel.findByIdAndUpdate(id, data);

    return assertFoundGQL(product);
  }

  public static async deleteByIdHttp(ctx: ProductContext): Promise<Product> {
    const product: Product | null = await ProductModel.findByIdAndDelete(ctx.params.id);
    return assertFound(product, ctx);
  }

  public static async deleteByIdGQL(id: string): Promise<Product> {
    const product: Product | null = await ProductModel.findByIdAndDelete(id);
    return assertFoundGQL(product);
  }
}
