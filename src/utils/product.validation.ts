import Joi from 'joi';
import { Schema } from 'joi';
import { Product } from '../db';
import { Context } from 'koa';

export const assertFound = <T>(body: T | null, ctx: Context): NonNullable<T> => {
  if (!body) {
    ctx.throw(404, 'Not found');
  }
  return body;
};

export const assertFoundGQL = <T>(body: T | null): NonNullable<T> => {
  if (!body) {
    throw new Error('Product not found');
  }
  return body;
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
