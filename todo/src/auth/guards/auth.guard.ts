import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validate(request);
  }

  private validate(request: any): boolean {
    if (!request.user) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }
    const token = request.headers.authorization.replace(/^Bearer /, '');
    this.authService.verifyToken(token);
    return true;
  }
}
