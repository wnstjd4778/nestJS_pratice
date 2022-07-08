import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SurveyForm } from '../../../types/survey-form';
import {ApiProperty} from "@nestjs/swagger";

type FieldType = Pick<
  SurveyForm,
  'title' | 'content' | 'writer' | 'cost' | 'maxResult'
> &
  Partial<Pick<SurveyForm, 'writer' | 'attachments'>>;

export class CreateSurveyFormDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsOptional()
  writer?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  maxResult: number;

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  attachments?: [string];
}
