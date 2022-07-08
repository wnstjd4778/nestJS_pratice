import {
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SurveyQuestion } from '../../../types/survey-question';
import {ApiProperty} from "@nestjs/swagger";

type FieldType = Partial<
  Pick<SurveyQuestion, 'question' | 'isMultipleChoice' | 'choice'>
>;

export class UpdateSurveyQuestionDto implements FieldType {

  @ApiProperty()
  @IsString()
  @IsOptional()
  question?: string;

  @ApiProperty()
  @IsBooleanString()
  @IsOptional()
  isMultipleChoice?: boolean;

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  choice?: [string];
}
