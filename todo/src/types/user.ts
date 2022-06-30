import { TUserRole } from '../users/schema/user.schema';

export interface IUser {
  _id?: string;
  name: string;
  phone: string;
  role: TUserRole;
  email: string;
}
