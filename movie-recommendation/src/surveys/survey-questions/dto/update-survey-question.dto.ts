import {
  IsBooleanString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SurveyQuestion } from '../../../types/survey-question';

type FieldType = Partial<
  Pick<SurveyQuestion, 'question' | 'isMultipleChoice' | 'choice'>
>;

export class UpdateSurveyQuestionDto implements FieldType {
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
