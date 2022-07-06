import { TUserRole } from '../users/schema/user.schema';
import { Auth } from './auth';

export interface User {
  name: string;
  phone: string;
  role: TUserRole;
  email: string;
  auth: string | Auth;
}

export interface IUserProfile {
  _id: string;
  role: TUserRole;
}
