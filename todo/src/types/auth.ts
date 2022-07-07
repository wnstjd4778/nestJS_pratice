import { TAuthProvider } from '../auth/schemas/auth.schema';
import { IdBase } from './base';

export interface Auth extends IdBase {
  provider: TAuthProvider;
  password: string;
  providerId: string;
  user: string;
  createAt: Date;
}
