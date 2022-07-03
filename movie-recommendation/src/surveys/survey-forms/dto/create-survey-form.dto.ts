import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class CreateSurveyFormDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  writer?: string;

  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @IsNumber()
  @IsNotEmpty()
  maxResult: number;
}
