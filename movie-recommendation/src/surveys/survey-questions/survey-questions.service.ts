import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateSurveyQuestionDto } from './dto/update-survey-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  SurveyQuestionDocument, SurveyQuestionModel,
} from '../schemas/survey-question.schema';
import { Model } from 'mongoose';
import { IAccessTokenPayload } from '../../types/auth-tokens';
import { CreateSurveyQuestionDto } from './dto/create-survey-question.dto';
import {
  SurveyFormDocument,
  SurveyFormModel,
} from '../schemas/survey-form.schema';

@Injectable()
export class SurveyQuestionsService {
  constructor(
    @InjectModel(SurveyQuestionModel.name)
    private surveyQuestionModel: Model<SurveyQuestionDocument>,
    @InjectModel(SurveyFormModel.name)
    private surveyFormModel: Model<SurveyFormDocument>,
  ) {}

  async createSurveyQuestion(
    dto: CreateSurveyQuestionDto,
  ): Promise<SurveyQuestionDocument> {
    const { question, isMultipleChoice, choice } = dto;
    return this.surveyQuestionModel.create({
      question,
      isMultipleChoice,
      choice,
    });
  }

  async updateSurveyQuestion(
    user: IAccessTokenPayload,
    id: string,
    dto: UpdateSurveyQuestionDto,
  ): Promise<SurveyQuestionDocument> {
    const surveyQuestion = await this.surveyQuestionModel.findById(id);
    if (!surveyQuestion) {
      throw new NotFoundException('해당 질문을 찾을 수 없습니다.');
    }
    const surveyForm = await this.surveyFormModel.findById(
      surveyQuestion.surveyForm,
    );

    if (!surveyForm) {
      await surveyQuestion.updateOne(dto);
    } else {
      if (String(surveyForm.writer) === user._id) {
        await surveyQuestion.updateOne(dto);
      } else {
        throw new UnauthorizedException('해당 질문을 변경할 수 없습니다.');
      }
    }
    return this.surveyQuestionModel.findById(id);
  }

  async deleteSurveyQuestion(
    user: IAccessTokenPayload,
    id: string,
  ): Promise<SurveyQuestionDocument> {
    const surveyQuestion = await this.surveyQuestionModel.findById(id);
    if (!surveyQuestion) {
      throw new NotFoundException('해당 질문을 찾을 수 없습니다.');
    }
    const surveyForm = await this.surveyFormModel.findById(
      surveyQuestion.surveyForm,
    );

    if (!surveyForm) {
      await surveyQuestion.deleteOne();
    } else {
      if (String(surveyForm.writer) === user._id) {
        await surveyQuestion.deleteOne();
        const idx: number = surveyForm.surveyQuestions.indexOf(
          surveyQuestion._id,
        );
        surveyForm.surveyQuestions.splice(idx, 1);
        await surveyForm.save();
      } else {
        throw new UnauthorizedException('해당 질문을 변경할 수 없습니다.');
      }
    }
    return surveyQuestion;
  }
}
