import { Schema } from 'joi';

export const assertResultExists = <T>(
  result: T | null,
  resourceName: string = 'Resource'
): NonNullable<T> => {
  if (!result) {
    throw new Error(`${resourceName} not found`);
  }
  return result;
};

export const validateRequestBody = <T>(schema: Schema<T>, object: T) => {
  const { error } = schema.validate(object, { abortEarly: false });
  if (error) {
    throw new Error('Validation Error');
  }
};
