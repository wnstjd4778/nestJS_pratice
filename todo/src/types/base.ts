import { User } from './user';

export interface IdBase {
  _id: string;
}

export interface CreateBase extends IdBase {
  creator: string | User;
  createAt: Date;
}

export interface UpdateBase extends IdBase {
  updater: string | User;
  updatedAt: Date;
}
