import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { QuerySurveyFormDto } from './dto/query-survey-form.dto';
import { UpdateSurveyFormDto } from './dto/update-survey-form.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  SurveyFormDocument,
  SurveyFormModel,
} from '../schemas/survey-form.schema';
import { Model } from 'mongoose';
import {
  SurveyQuestionDocument,
  SurveyQuestionModel,
} from '../schemas/survey-question.schema';
import { IAccessTokenPayload } from '../../types/auth-tokens';
import { CreateSurveyFormDto } from './dto/create-survey-form.dto';
import { UsersService } from '../../users/users.service';
import { UploadsService } from '../../uploads/uploads.service';
import { createHttpException } from '../../errors/create-error';
import { ErrorCodes } from '../../errors/error-definition';

@Injectable()
export class SurveyFormsService {
  constructor(
    @InjectModel(SurveyFormModel.name)
    private surveyFormModel: Model<SurveyFormDocument>,
    @InjectModel(SurveyQuestionModel.name)
    private surveyQuestionModel: Model<SurveyQuestionDocument>,
    private usersService: UsersService,
    private uploadsService: UploadsService,
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
    const { title, content, writer, cost, maxResult, attachments } = dto;
    const surveyForm = await this.surveyFormModel.create({
      writer,
      content,
      cost,
      title,
      maxResult,
      attachments,
    });
    await this.uploadsService.connectFiles(
      surveyForm._id,
      'SurveyForm',
      attachments,
    );
    return surveyForm;
  }

  async updateSurveyForm(
    id: string,
    dto: UpdateSurveyFormDto,
  ): Promise<SurveyFormDocument> {
    const surveyForm = await this.surveyFormModel.findById(id);
    if (!surveyForm) {
      throw createHttpException(NotFoundException, {
        code: ErrorCodes.NOT_FOUND_SURVEY_FORM,
      });
    }
    if (String(surveyForm.writer) !== dto.writer) {
      throw new UnauthorizedException('해당 설문조사에 접근할 수 없습니다.');
    }
    if (dto.surveyQuestions) {
      await this.surveyQuestionModel.updateMany(
        { _id: { $in: dto.surveyQuestions } },
        { surveyForm: surveyForm._id },
      );
      dto.surveyQuestions.forEach((value) => {
        if (!surveyForm.surveyQuestions.includes(value)) {
          surveyForm.surveyQuestions.push(value);
        }
      });
    }

    await surveyForm.updateOne(dto);
    await surveyForm.save();
    await this.uploadsService.updateFiles(
      surveyForm._id,
      'SurveyForm',
      dto.attachments,
    );
    return this.surveyFormModel
      .findOne({ _id: id })
      .populate('surveyQuestions');
  }

  async deleteSurveyForm(
    user: IAccessTokenPayload,
    id: string,
  ): Promise<SurveyFormDocument> {
    const surveyForm = await this.surveyFormModel.findById(id);
    if(!surveyForm) {
      throw createHttpException(NotFoundException, {
        code: ErrorCodes.NOT_FOUND_SURVEY_FORM,
      });
    }
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
