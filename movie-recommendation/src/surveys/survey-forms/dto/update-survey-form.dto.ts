import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SurveyForm } from '../../../types/survey-form';

type FieldType = Partial<
  Pick<
    SurveyForm,
    'title' | 'content' | 'surveyQuestions' | 'writer' | 'attachments'
  >
>;
export class UpdateSurveyFormDto implements FieldType {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString({ each: true })
  @IsOptional()
  surveyQuestions?: [string];

  @IsOptional()
  writer?: string;

  @IsString({ each: true })
  @IsOptional()
  attachments: [string];
}
