export const USER_ROLES = ['member', 'admin'] as const;
export type TUserRole = typeof USER_ROLES[number];

export interface IUser {
  _id?: string;
  email: string;
  name: string;
  role: TUserRole;
  phone: string;
  auth?: string;
}
