import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Movie {
  @Prop({ type: String, required: true, index: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Number })
  score: number;

  @Prop([String])
  genre: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  user: string;
}

export type MovieDocument = Movie & mongoose.Document;
export const MovieSchema = SchemaFactory.createForClass(Movie);
