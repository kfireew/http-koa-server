import { Schema, model, Document } from 'mongoose';

export interface Product {
  name: string;
  price: number;
  description?: string;
  stock: number;
}

export type ProductDocument = Product & Document;

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    stock: Number
  },
  { timestamps: true }
);

export const ProductModel = model<ProductDocument>('Product', ProductSchema);
