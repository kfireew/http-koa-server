import { AppError, HttpError, HttpErrors } from './app-errors.types';

const createError = (name: HttpError, message: string): AppError =>
  Object.assign(new Error(message), { name, status: HttpErrors[name] });

export const errorsFactory = {
  badRequest: (message: string): AppError => createError('BadRequestError', message),
  NotFoundError: (message: string): AppError => createError('NotFoundError', message),
  InternalServerError: (message: string): AppError => createError('InternalServerError', message)
};
