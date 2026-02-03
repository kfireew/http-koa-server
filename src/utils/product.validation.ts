import Joi from 'joi';
import { Schema } from 'joi';
import { Product } from '../db';

export const assertResultExists = <T>(result: T | null): NonNullable<T> => {
  if (!result) {
    throw new Error('Product not found');
  }
  return result;
};

export const validateSchema = <T>(schema: Schema<T>, object: T) => {
  const { error } = schema.validate(object, { abortEarly: false });
  if (error) {
    throw new Error('Validation Error');
  }
};

export const productSchema: Joi.ObjectSchema<Product> = Joi.object({
  name: Joi.string().min(1).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().required(),
  stock: Joi.number().min(0).required()
});

export const productUpdateSchema: Joi.ObjectSchema<Partial<Product>> = Joi.object({
  name: Joi.string().min(1),
  price: Joi.number().min(0),
  description: Joi.string(),
  stock: Joi.number().min(0)
}).min(1);
