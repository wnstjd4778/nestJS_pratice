import { TAuthProvider } from '../auth/schemas/auth.schema';

export interface IAUth {
  _id?: string;
  provider: TAuthProvider;
  password?: string;
  providerId: string;
  user: string;
}
