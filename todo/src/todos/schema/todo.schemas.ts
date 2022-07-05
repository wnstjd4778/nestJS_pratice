import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timestamp } from 'rxjs';
import mongoose from "mongoose";
import { Document } from 'mongoose';
import {IFile} from "../../types/file";

@Schema({ timestamps: true })
export class Todo {
  @Prop({ type: String, index: true, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Boolean, default: false })
  done: boolean;

  @Prop({type: mongoose.Types.ObjectId, required: true, ref: 'User'})
  user?: string;

  @Prop({type: [mongoose.Types.ObjectId]})
  attachments: Array<IFile | string>
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);
