import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SurveyResult } from '../../../types/survey-result';
import {ApiProperty} from "@nestjs/swagger";

type FieldType = Pick<SurveyResult, 'answers'> &
  Partial<Pick<SurveyResult, 'user'>>;

export class CreateSurveyResultDto implements FieldType {

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty()
  answers: [string];

  @ApiProperty()
  @IsString()
  @IsOptional()
  user?: string;
}
