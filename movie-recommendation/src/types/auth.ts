export const AUTH_PROVIDERS = ['kakao', 'naver', 'local'] as const;
export type TAuthProvider = typeof AUTH_PROVIDERS[number];

export interface IAuth {
  _id?: string;
  provider: TAuthProvider;
  providerId: string;
  password?: string;
  user: string;
}
