import { SetMetadata } from '@nestjs/common';
import { TUserRole } from '../types/user';

export const Roles = (...roles: TUserRole[]) => {
  console.log('role decorator 통과');
  return SetMetadata('roles', roles);
};
