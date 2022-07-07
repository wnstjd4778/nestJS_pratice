import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export interface SurveyResult {
  _id: string;
  surveyQuestion: string;
  user: string;
  answers: [string];
}
