import Joi from 'joi';
import { Schema } from 'joi';
import { Product } from '../db';

export function validateSchema<T>(schema: Schema<T>, object: T) {
  const { error } = schema.validate(object, { abortEarly: false });
  if (error) {
    throw {
      status: 400,
      message: 'Validation Error',
      details: error.details.map((d) => d.message)
    };
  }
}

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
