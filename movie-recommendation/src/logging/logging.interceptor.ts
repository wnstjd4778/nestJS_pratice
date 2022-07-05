import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { url, method } = context.switchToHttp().getRequest();
    this.logger.log(`Request ${method} ${url} `);
    return next
      .handle()
      .pipe(
        tap(
          (data) => (
            this.logger.log(`Response ${method} ${url}`), this.logger.log(data)
          ),
        ),
      );
  }
}
