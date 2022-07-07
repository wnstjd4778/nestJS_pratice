import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SurveyForm } from '../../types/survey-form';

type FieldType = Pick<
  SurveyForm,
  'title' | 'content' | 'surveyQuestions' | 'writer' | 'maxResult'
> &
  Partial<
    Pick<SurveyForm, 'viewCnt' | 'attachments' | 'comments' | 'participants'>
  >;

@Schema({ collection: 'surveyForm', timestamps: true })
export class SurveyFormModel implements FieldType {
  @Prop({ type: String, required: true, index: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    default: null,
    ref: 'SurveyQuestionModel',
  })
  surveyQuestions: [string];

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'UserModel' })
  writer: string;

  @Prop({ type: Number, default: 0 })
  viewCnt: number;

  @Prop({ type: Number, required: true })
  cost: number;

  @Prop({ type: Number, required: true })
  maxResult: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'UserModel', default: null })
  participants: [string];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'CommentModel',
    default: null,
  })
  comments: [string];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'FileModel', default: null })
  attachments: [string];
}

export type SurveyFormDocument = SurveyFormModel & mongoose.Document;
export const SurveyFormSchema = SchemaFactory.createForClass(SurveyFormModel);
