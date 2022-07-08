import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SurveyForm } from '../../../types/survey-form';
import {ApiProperty} from "@nestjs/swagger";

type FieldType = Partial<
  Pick<
    SurveyForm,
    'title' | 'content' | 'surveyQuestions' | 'writer' | 'attachments'
  >
>;
export class UpdateSurveyFormDto implements FieldType {

  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  surveyQuestions?: [string];

  @ApiProperty()
  @IsOptional()
  writer?: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  attachments: [string];
}
