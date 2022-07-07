import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Comment } from '../../types/comment';

type FieldType = Pick<Comment, 'title' | 'user' | 'surveyForm'>;
@Schema({collection: 'comment'})
export class CommentModel implements FieldType {
  @Prop({ type: String, required: true, index: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel', required: true })
  user: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SurveyFormModel',
    required: true,
  })
  surveyForm: string;
}

export type CommentDocument = mongoose.Document & CommentModel;
export const CommentSchema = SchemaFactory.createForClass(CommentModel);
