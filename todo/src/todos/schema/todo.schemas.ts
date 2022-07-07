import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timestamp } from 'rxjs';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Todo } from '../../types/todo';

type fieldType = Pick<Todo, 'title' | 'content'> &
  Partial<Pick<Todo, 'done' | 'user' | 'attachments'>>;

@Schema({ collection: 'todo', timestamps: true })
export class TodoModel implements fieldType {
  @Prop({ type: String, index: true, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Boolean, default: false })
  done?: boolean;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: 'User' })
  user?: string;

  @Prop({ type: [mongoose.Types.ObjectId] })
  attachments?: Array<File | string>;
}

export type TodoDocument = TodoModel & Document;
export const TodoSchema = SchemaFactory.createForClass(TodoModel);
