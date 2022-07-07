import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { SurveyForm } from '../../../types/survey-form';

type FieldType = Partial<Pick<SurveyForm, 'title' | 'content' | 'writer'>>;

export class QuerySurveyFormDto implements FieldType {
  @IsString()
  @IsOptional()
  @Transform((value) => RegExp(value.value))
  title?: string;

  @IsString()
  @IsOptional()
  @Transform((value) => RegExp(value.value))
  content?: string;

  @IsString()
  @IsOptional()
  writer?: string;
}
