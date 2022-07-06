import { CreateBase } from './base';

export interface Todo extends CreateBase {
  title: string;

  content: string;

  done: boolean;

  user?: string;

  attachments: Array<File | string>;

  updatedAt: string;
}
