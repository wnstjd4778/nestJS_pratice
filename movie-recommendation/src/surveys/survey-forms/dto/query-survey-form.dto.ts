import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { SurveyForm } from '../../../types/survey-form';
import { ApiProperty } from '@nestjs/swagger';

type FieldType = Partial<Pick<SurveyForm, 'title' | 'content' | 'writer'>>;

export class QuerySurveyFormDto implements FieldType {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @Transform((value) => RegExp(value.value))
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Transform((value) => RegExp(value.value))
  content?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  writer?: string;
}
