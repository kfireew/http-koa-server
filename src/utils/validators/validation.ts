import { Schema } from 'joi';
import { NotFoundError, ValidationError } from '../errors';

export const assertResultExists = <T>(
  result: T | null,
  resourceName: string = 'Resource'
): NonNullable<T> => {
  if (!result) {
    throw new NotFoundError(resourceName);
  }
  return result;
};

export const validateSchema = <T>(schema: Schema<T>, object: T) => {
  const { error } = schema.validate(object, { abortEarly: false });
  if (error) {
    throw new ValidationError(error);
  }
};
