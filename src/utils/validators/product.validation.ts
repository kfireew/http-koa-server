import Joi from 'joi';
import { Product } from '../../db';

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
