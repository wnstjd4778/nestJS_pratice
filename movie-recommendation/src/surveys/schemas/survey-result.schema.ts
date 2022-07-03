import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema({ timestamps: true })
export class SurveyResult {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SurveyQuestion',
  })
  surveyQuestion: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  user: string;

  @Prop({ type: [String], required: true })
  answer: string;
}

export type SurveyResultDocument = SurveyResult & mongoose.Document;
export const SurveyResultSchema = SchemaFactory.createForClass(SurveyResult);
