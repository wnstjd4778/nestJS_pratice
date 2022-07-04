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
  constructor(private logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('logging');
    const { method, url } = context.switchToHttp().getRequest();
    this.logger.log(`Request to ${method} ${url}`);
    return next
      .handle()
      .pipe(
        tap(
          (data) => (
            this.logger.log(`Response from ${method} ${url}`),
            this.logger.log(data)
          ),
        ),
      );
  }
}
