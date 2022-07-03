import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSurveyFormDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString({ each: true })
  @IsOptional()
  questions?: [string];

  @IsOptional()
  user?: string;
}
