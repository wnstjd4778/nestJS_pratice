import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { TUserRole } from '../../types/user';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<TUserRole>('roles', context.getHandler());
    console.log('RoleGuard ::: ' + roles);
    if (!roles) {
      return true;
    }
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('해당 권한으로 접근할 수 없습니다.');
    }
    if (!roles.includes(user.role)) {
      throw new UnauthorizedException('해당 권한으로 접근할 수 없습니다.');
    }
    return true;
  }
}
