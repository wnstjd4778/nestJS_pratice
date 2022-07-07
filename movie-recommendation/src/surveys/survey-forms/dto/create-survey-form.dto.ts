import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SurveyForm } from '../../../types/survey-form';

type FieldType = Pick<
  SurveyForm,
  'title' | 'content' | 'writer' | 'cost' | 'maxResult'
> &
  Partial<Pick<SurveyForm, 'writer' | 'attachments'>>;

export class CreateSurveyFormDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  writer?: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @IsNumber()
  @IsNotEmpty()
  maxResult: number;

  @IsString({ each: true })
  @IsOptional()
  attachments?: [string];
}
