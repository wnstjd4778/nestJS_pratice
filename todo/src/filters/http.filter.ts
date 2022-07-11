import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class JwtExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getResponse<Request>();
    const status = exception.getStatus();
    let code = 'invalid access-token';
    console.log(request.authInfo as any);
    if (request.authInfo) {
      const { message } = request.authInfo as any;
      if (message === 'jwt expired') {
        code = 'access-token expired';
      }
    }
    response.status(status).json({
      status,
      code,
      path: request.url,
    });
  }
}
