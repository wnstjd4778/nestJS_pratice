import { TUserRole } from './user';

export interface IAuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface IAccessTokenPayload {
  _id: string;
  role: TUserRole;
}

export interface IRefreshTokenPayload {
  _id: string;
}
