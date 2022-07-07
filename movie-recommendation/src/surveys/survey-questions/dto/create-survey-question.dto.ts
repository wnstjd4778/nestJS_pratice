import {
  IsBoolean,
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SurveyQuestion } from '../../../types/survey-question';

type FieldType = Pick<SurveyQuestion, 'question' | 'isMultipleChoice'> &
  Partial<Pick<SurveyQuestion, 'choice'>>;

export class CreateSurveyQuestionDto implements FieldType {
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
