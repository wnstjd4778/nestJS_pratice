import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { TUserRole } from '../../users/schema/user.schema';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<TUserRole[]>(
      'roles',
      context.getHandler(),
    );
    if (!roles) {
      return true;
    }
    const request: any = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('권한이 없는 요청입니다.');
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException('권한이 없는 요청입니다.');
    }

    return true;
  }
}
