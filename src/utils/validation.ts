import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().min(1).required(),
  price: Joi.number().min(0).required(),
  description: Joi.string().optional(),
});
