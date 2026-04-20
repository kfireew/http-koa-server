export interface AppError extends Error {
  status: number;
}

export const StatusByError = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;

export const HttpErrors = {
  BadRequestError: StatusByError.BAD_REQUEST,
  NotFoundError: StatusByError.NOT_FOUND,
  InternalServerError: StatusByError.INTERNAL_SERVER_ERROR
} as const;

export type HttpError = keyof typeof HttpErrors;

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof Error && error.name in HttpErrors;
};
