import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SurveyResult } from '../../../types/survey-result';

type FieldType = Pick<SurveyResult, 'answers'> &
  Partial<Pick<SurveyResult, 'user'>>;

export class CreateSurveyResultDto implements FieldType {
  @IsString({ each: true })
  @IsNotEmpty()
  answers: [string];

  @IsString()
  @IsOptional()
  user?: string;
}
