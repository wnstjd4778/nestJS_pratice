import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSurveyResultDto {
  @IsString({ each: true })
  @IsNotEmpty()
  answers: [string];

  @IsString()
  @IsOptional()
  user?: string;
}
