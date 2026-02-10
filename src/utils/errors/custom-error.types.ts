import { AppError } from './custom-errors';

export interface DetailedError extends AppError {
  details?: unknown;
}

export const isDetailedError = (err: AppError): err is DetailedError => {
  return 'details' in err;
};
