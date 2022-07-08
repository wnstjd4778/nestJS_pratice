import {
  IsBoolean,
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SurveyQuestion } from '../../../types/survey-question';
import {ApiProperty} from "@nestjs/swagger";

type FieldType = Pick<SurveyQuestion, 'question' | 'isMultipleChoice'> &
  Partial<Pick<SurveyQuestion, 'choice'>>;

export class CreateSurveyQuestionDto implements FieldType {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isMultipleChoice: boolean;

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  choice?: [string];
}
