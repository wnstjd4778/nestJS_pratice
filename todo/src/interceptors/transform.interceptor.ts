import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
export interface Response<T> {
  status: number;
  data: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("transfer");
    const res = context.switchToHttp().getResponse();
    const status = res.statusCode;
    return next.handle().pipe(map((data) => ({ status, data })));
  }
}
