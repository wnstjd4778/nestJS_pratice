import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { QuerySurveyFormDto } from './dto/query-survey-form.dto';
import { UpdateSurveyFormDto } from './dto/update-survey-form.dto';
import { ISurveyForm } from '../../types/survey-form';
import { InjectModel } from '@nestjs/mongoose';
import { SurveyForm, SurveyFormDocument } from '../schemas/survey-form.schema';
import { Model } from 'mongoose';
import {
  SurveyQuestion,
  SurveyQuestionDocument,
} from '../schemas/survey-question.schema';
import { IAccessTokenPayload } from '../../types/auth-tokens';
import { CreateSurveyFormDto } from './dto/create-survey-form.dto';
import { User, UserDocument } from '../../users/schema/user.schema';
import { UsersService } from '../../users/users.service';

@Injectable()
export class SurveyFormsService {
  constructor(
    @InjectModel(SurveyForm.name)
    private surveyFormModel: Model<SurveyFormDocument>,
    @InjectModel(SurveyQuestion.name)
    private surveyQuestionModel: Model<SurveyQuestionDocument>,
    private usersService: UsersService,
  ) {}
  async findAllSurveyForms(
    query: QuerySurveyFormDto,
  ): Promise<SurveyFormDocument[]> {
    return this.surveyFormModel
      .find(query)
      .populate('writer', 'email')
      .populate('surveyQuestions');
  }

  async findSurveyForm(id: string): Promise<SurveyFormDocument> {
    return this.surveyFormModel
      .findById(id)
      .populate('writer', 'email')
      .populate('surveyQuestions')
      .exec();
  }

  async createSurveyForm(
    dto: CreateSurveyFormDto,
  ): Promise<SurveyFormDocument> {
    const { title, content, writer, cost, maxResult } = dto;

    return this.surveyFormModel.create({
      writer,
      content,
      cost,
      title,
      maxResult,
    });
  }

  async updateSurveyForm(
    id: string,
    dto: UpdateSurveyFormDto,
  ): Promise<SurveyFormDocument> {
    const surveyForm = await this.surveyFormModel.findById(id);
    if (!surveyForm) {
      throw new NotFoundException('해당 설문조사를 찾을 수 없습니다.');
    }
    if (String(surveyForm.writer) !== dto.user) {
      throw new UnauthorizedException('해당 설문조사에 접근할 수 없습니다.');
    }
    await this.surveyQuestionModel.updateMany(
      { _id: { $in: dto.questions } },
      { surveyForm: surveyForm._id },
    );
    await surveyForm.updateOne(dto);
    dto.questions.forEach((value) => {
      if (!surveyForm.surveyQuestions.includes(value)) {
        surveyForm.surveyQuestions.push(value);
      }
    });
    await surveyForm.save();

    return this.surveyFormModel
      .findOne({ _id: id })
      .populate('surveyQuestions');
  }

  async deleteSurveyForm(
    user: IAccessTokenPayload,
    id: string,
  ): Promise<SurveyFormDocument> {
    const surveyForm = await this.surveyFormModel.findById(id);
    if (String(surveyForm.writer) !== user._id) {
      throw new UnauthorizedException('해당 설문조사에 접근할 수 없습니다.');
    }
    const exChangePoint =
      (surveyForm.maxResult - surveyForm.participants.length) * surveyForm.cost;
    await this.usersService.exchangePointByDeleteSurvey(
      exChangePoint,
      user._id,
    );
    await this.surveyQuestionModel.deleteMany({ surveyForm: id });
    surveyForm.deleteOne();
    return surveyForm;
  }

  async checkEnoughPoint(dto: CreateSurveyFormDto): Promise<void> {
    const costSum = dto.cost * dto.maxResult;
    await this.usersService.checkPointAndPay(costSum, dto.writer);
  }
}
