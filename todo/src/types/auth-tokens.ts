import { TUserRole } from '../users/schema/user.schema';

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUserProfile {
  _id: string;
  role: TUserRole;
}

export interface IRefreshTokenPayload {
  _id: string;
  value: string;
}
