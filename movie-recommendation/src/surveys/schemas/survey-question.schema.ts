import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class SurveyQuestion {
  @Prop({ type: String, required: true })
  question: string;

  @Prop({ type: Boolean, required: true })
  isMultipleChoice: boolean;

  @Prop({ type: [String], default: null })
  choice: [string];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'SurveyForm',
  })
  surveyForm: string;
}

export type SurveyQuestionDocument = SurveyQuestion & mongoose.Document;
export const SurveyQuestionSchema =
  SchemaFactory.createForClass(SurveyQuestion);
