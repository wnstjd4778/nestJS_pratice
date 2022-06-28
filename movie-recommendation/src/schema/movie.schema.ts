import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export type MovieDocument = Movie & Document;
export const MovieSchema = SchemaFactory.createForClass(Movie);
