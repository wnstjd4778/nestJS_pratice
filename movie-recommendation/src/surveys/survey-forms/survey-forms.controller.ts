import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SurveyFormsService } from './survey-forms.service';
import { QuerySurveyFormDto } from './dto/query-survey-form.dto';
import { CreateSurveyFormDto } from './dto/create-survey-form.dto';
import { UpdateSurveyFormDto } from './dto/update-survey-form.dto';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { User } from '../../decorators/user.decorator';
import { IAccessTokenPayload } from '../../types/auth-tokens';
import { SurveyFormDocument } from '../schemas/survey-form.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('survey-forms')
@Controller('survey-forms')
export class SurveyFormsController {
  constructor(private readonly surveyFormsService: SurveyFormsService) {}

  @Get()
  findAllSurveyForms(@Query() query: QuerySurveyFormDto) {
    return this.surveyFormsService.findAllSurveyForms(query);
  }

  @Get('me')
  findAllMySurveysForms(@Query() query: QuerySurveyFormDto) {
    return this.surveyFormsService.findAllSurveyForms(query);
  }

  @Get(':id')
  async findSurveyForm(@Param('id') id: string): Promise<SurveyFormDocument> {
    const surveyForm = await this.surveyFormsService.findSurveyForm(id);
    if (!surveyForm) {
      throw new NotFoundException('해당 설문조사를 찾을 수 없습니다.');
    }
    surveyForm.viewCnt++;
    await surveyForm.save();
    return surveyForm;
  }

  @Post()
  @UseGuards(AuthGuard)
  async createSurveyForm(
    @User() user: IAccessTokenPayload,
    @Body() dto: CreateSurveyFormDto,
  ) {
    dto.writer = user._id;
    await this.surveyFormsService.checkEnoughPoint(dto);
    return this.surveyFormsService.createSurveyForm(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateSurveyForm(
    @User() user: IAccessTokenPayload,
    @Param('id') id: string,
    @Body() dto: UpdateSurveyFormDto,
  ) {
    dto.writer = user._id;
    return this.surveyFormsService.updateSurveyForm(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteSurveyForm(@User() user: IAccessTokenPayload, @Param('id') id: string) {
    return this.surveyFormsService.deleteSurveyForm(user, id);
  }


}
