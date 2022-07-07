import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SurveyFormModel,
  SurveyFormSchema,
} from './schemas/survey-form.schema';
import {
  SurveyResultModel,
  SurveyResultSchema,
} from './schemas/survey-result.schema';
import {
  SurveyQuestionModel,
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
import { UploadsModule } from '../uploads/uploads.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SurveyFormModel.name, schema: SurveyFormSchema },
      { name: SurveyResultModel.name, schema: SurveyResultSchema },
      { name: SurveyQuestionModel.name, schema: SurveyQuestionSchema },
    ]),
    AuthModule,
    UsersModule,
    UploadsModule,
  ],
  controllers: [
    SurveyFormsController,
    SurveyResultsController,
    SurveyQuestionsController,
  ],
  providers: [SurveyFormsService, SurveyResultsService, SurveyQuestionsService],
})
export class SurveysModule {}
