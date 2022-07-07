import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSurveyResultDto } from './dto/create-survey-result.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  SurveyResultDocument,
  SurveyResultModel,
} from '../schemas/survey-result.schema';
import { Model } from 'mongoose';
import {
  SurveyFormDocument,
  SurveyFormModel,
} from '../schemas/survey-form.schema';
import { UsersService } from '../../users/users.service';

@Injectable()
export class SurveyResultsService {
  constructor(
    @InjectModel(SurveyResultModel.name)
    private surveyResultModel: Model<SurveyResultDocument>,
    @InjectModel(SurveyFormModel.name)
    private surveyFormModel: Model<SurveyFormDocument>,
    private readonly usersService: UsersService,
  ) {}
  async createSurveyResult(id: string, dto: CreateSurveyResultDto) {
    const surveyForm = await this.surveyFormModel.findById(id);
    if (!surveyForm) {
      throw new NotFoundException('설문조사를 찾을 수 없습니다.');
    }
    if (surveyForm.surveyQuestions.length !== dto.answers.length) {
      throw new BadRequestException('모든 질문에 응답해주세요');
    }
    if (surveyForm.participants.includes(dto.user)) {
      throw new BadRequestException('이미 설문조사에 참여하셨습니다.');
    }
    for (let i = 0; i < dto.answers.length; i++) {
      const surveyQuestion = surveyForm.surveyQuestions[i];
      const answer = dto.answers[i];
      await this.surveyResultModel.create({
        surveyQuestion,
        answer,
        user: dto.user,
      });
    }
    surveyForm.participants.push(dto.user);
    await this.usersService.increasePointBySurvey(surveyForm.cost, dto.user);
    await surveyForm.save();
    return;
  }
}
