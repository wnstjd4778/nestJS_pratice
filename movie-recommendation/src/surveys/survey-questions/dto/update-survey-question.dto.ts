import {
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSurveyQuestionDto {
  @IsString()
  @IsOptional()
  question?: string;

  @IsBooleanString()
  @IsOptional()
  isMultipleChoice?: boolean;

  @IsString({ each: true })
  @IsOptional()
  choice?: [string];
}
