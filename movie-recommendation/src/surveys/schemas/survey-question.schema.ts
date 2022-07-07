import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { SurveyQuestion } from '../../types/survey-question';

type FieldType = Pick<SurveyQuestion, 'question' | 'isMultipleChoice'> &
  Partial<Pick<SurveyQuestion, 'choice' | 'surveyForm'>>;

@Schema({ timestamps: true, collection: 'surveyQuestion' })
export class SurveyQuestionModel implements FieldType {
  @Prop({ type: String, required: true })
  question: string;

  @Prop({ type: Boolean, required: true })
  isMultipleChoice: boolean;

  @Prop({ type: [String], default: null })
  choice: [string];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'SurveyFormModel',
  })
  surveyForm: string;
}

export type SurveyQuestionDocument = SurveyQuestionModel & mongoose.Document;
export const SurveyQuestionSchema =
  SchemaFactory.createForClass(SurveyQuestionModel);
