import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ISurveyForm } from '../../types/survey-form';
@Schema({ timestamps: true })
export class SurveyForm implements ISurveyForm {
  @Prop({ type: String, required: true, index: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    default: null,
    ref: 'SurveyQuestion',
  })
  surveyQuestions: [string];

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  writer: string;

  @Prop({ type: Number, default: 0 })
  viewCnt: number;

  @Prop({ type: Number, required: true })
  cost: number;

  @Prop({ type: Number, required: true })
  maxResult: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: null })
  participants: [string];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Comment', default: null })
  comments: [string];
}

export type SurveyFormDocument = SurveyForm & mongoose.Document;
export const SurveyFormSchema = SchemaFactory.createForClass(SurveyForm);
