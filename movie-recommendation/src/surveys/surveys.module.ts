import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveyForm, SurveyFormSchema } from './schemas/survey-form.schema';
import {
  SurveyResult,
  SurveyResultSchema,
} from './schemas/survey-result.schema';
import {
  SurveyQuestion,
  SurveyQuestionSchema,
} from './schemas/survey-question.schema';
import { SurveyFormsController } from './survey-forms/survey-forms.controller';
import { SurveyFormsService } from './survey-forms/survey-forms.service';
import { SurveyResultsController } from './survey-results/survey-results.controller';
import { SurveyResultsService } from './survey-results/survey-results.service';
import { SurveyQuestionsService } from './survey-questions/survey-questions.service';
import { SurveyQuestionsController } from './survey-questions/survey-questions.controller';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SurveyForm.name, schema: SurveyFormSchema },
      { name: SurveyResult.name, schema: SurveyResultSchema },
      { name: SurveyQuestion.name, schema: SurveyQuestionSchema },
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [
    SurveyFormsController,
    SurveyResultsController,
    SurveyQuestionsController,
  ],
  providers: [SurveyFormsService, SurveyResultsService, SurveyQuestionsService],
})
export class SurveysModule {}
