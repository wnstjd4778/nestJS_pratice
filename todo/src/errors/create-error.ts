import { ErrorCodes } from './error-definition';

export interface ErrorResponse {
  code: ErrorCodes;
  statusCode?: number;
  message?: string;
  data?: any;
}

interface HttpExceptionConstructor {
  new (response: ErrorResponse);
}

export function createHttpException(
  ctor: HttpExceptionConstructor,
  response: ErrorResponse,
) {
  return new ctor(response);
}
