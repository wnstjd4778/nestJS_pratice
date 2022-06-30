import { Prop } from '@nestjs/mongoose';

export interface Itodo {
  _id?: string;

  title: string;

  content: string;

  done: boolean;

  user?: string;
}
