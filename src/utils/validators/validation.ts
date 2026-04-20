import { Schema } from 'joi';
import { errorsFactory } from '../errors';

export const assertResultExists = <T>(
  result: T | null,
  resourceName: string = 'Resource'
): NonNullable<T> => {
  if (!result) {
    throw errorsFactory.NotFoundError(`${resourceName} not found`);
  }
  return result;
};

export const validateSchema = <T>(schema: Schema<T>, object: T) => {
  const { error } = schema.validate(object, { abortEarly: false });
  if (error) {
    throw errorsFactory.badRequest(error.message);
  }
};
