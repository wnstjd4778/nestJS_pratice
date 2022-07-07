import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export interface Comment {
  _id: string;
  title: string;
  user: string;
  surveyForm: string;
}
