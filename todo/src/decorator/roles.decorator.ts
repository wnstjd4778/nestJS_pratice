import { SetMetadata } from '@nestjs/common';
import {TUserRole} from "../users/schema/user.schema";

export const Roles = (...roles: TUserRole[]) => SetMetadata('role', roles);
