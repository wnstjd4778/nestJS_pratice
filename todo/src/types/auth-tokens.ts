import { TUserRole } from '../users/schema/user.schema';

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokenPayload {
  _id: string;
  value: string;
}
