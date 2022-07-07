import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SurveyResult } from '../../types/survey-result';

type FieldType = Pick<SurveyResult, 'surveyQuestion' | 'user' | 'answers'>;

@Schema({ collection: 'surveyResult', timestamps: true })
export class SurveyResultModel implements FieldType{
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SurveyQuestionModel',
  })
  surveyQuestion: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'UserModel' })
  user: string;

  @Prop({ type: [String], required: true })
  answers: [string];
}

export type SurveyResultDocument = SurveyResultModel & mongoose.Document;
export const SurveyResultSchema =
  SchemaFactory.createForClass(SurveyResultModel);
