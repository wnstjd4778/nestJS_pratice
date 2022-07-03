import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QuerySurveyFormDto {
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
