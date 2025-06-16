import { Product, IProduct } from './product.model';

export const findAll = async (): Promise<IProduct[]> => {
  return Product.find();
};

export const findById = async (id: string): Promise<IProduct | null> => {
  return Product.findById(id);
};

export const createOne = async (data: Partial<IProduct>): Promise<IProduct> => {
  const product = new Product(data);
  return product.save();
};

export const updateById = async (id: string, data: Partial<IProduct>): Promise<IProduct | null> => {
  return Product.findByIdAndUpdate(id, data, { new: true });
};

export const deleteById = async (id: string): Promise<IProduct | null> => {
  return Product.findByIdAndDelete(id);
};
