import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema()
export class Comment {
  @Prop({ type: String, required: true, index: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SurveyForm',
    required: true,
  })
  surveyForm: string;
}

export type CommentDocument = mongoose.Document & Comment;
export const CommentSchema = SchemaFactory.createForClass(Comment);
