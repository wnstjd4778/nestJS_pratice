import {
  IsBoolean,
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSurveyQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsBoolean()
  @IsNotEmpty()
  isMultipleChoice: boolean;

  @IsString({ each: true })
  @IsOptional()
  choice?: [string];
}
