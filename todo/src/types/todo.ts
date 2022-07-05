import { Prop } from '@nestjs/mongoose';
import {IFile} from "./file";

export interface Itodo {
  _id?: string;

  title: string;

  content: string;

  done: boolean;

  user?: string;

  attachments: Array<IFile | string>;
}
