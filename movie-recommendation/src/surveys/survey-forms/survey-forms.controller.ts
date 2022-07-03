import {
  Body,
  Controller,
  Delete,
  Get,
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
import { IUser } from '../../types/user';
import { IAccessTokenPayload } from '../../types/auth-tokens';

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
  findSurveyForm(@Param('id') id: string) {
    return this.surveyFormsService.findSurveyForm(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  createSurveyForm(
    @User() user: IAccessTokenPayload,
    @Body() dto: CreateSurveyFormDto,
  ) {
    dto.writer = user._id;
    return this.surveyFormsService.createSurveyForm(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateSurveyForm(@User() user: IAccessTokenPayload, @Param('id') id: string, @Body() dto: UpdateSurveyFormDto) {
    dto.user = user._id;
    return this.surveyFormsService.updateSurveyForm(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteSurveyForm(@User() user: IAccessTokenPayload, @Param('id') id: string) {
    return this.surveyFormsService.deleteSurveyForm(user, id);
  }
}
