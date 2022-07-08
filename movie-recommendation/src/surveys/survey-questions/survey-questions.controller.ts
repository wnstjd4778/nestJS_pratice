import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { SurveyQuestionsService } from './survey-questions.service';
import { UpdateSurveyQuestionDto } from './dto/update-survey-question.dto';
import { User } from '../../decorators/user.decorator';
import { IAccessTokenPayload } from '../../types/auth-tokens';
import { CreateSurveyQuestionDto } from './dto/create-survey-question.dto';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('survey-questions')
@Controller('survey-questions')
export class SurveyQuestionsController {
  constructor(
    private readonly surveyQuestionsService: SurveyQuestionsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  createSurveyQuestion(
    @User() user: IAccessTokenPayload,
    @Body() dto: CreateSurveyQuestionDto,
  ) {
    return this.surveyQuestionsService.createSurveyQuestion(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateSurveyQuestion(
    @User() user: IAccessTokenPayload,
    @Param('id') id: string,
    @Body() dto: UpdateSurveyQuestionDto,
  ) {
    return this.surveyQuestionsService.updateSurveyQuestion(user, id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteSurveyQuestion(
    @User() user: IAccessTokenPayload,
    @Param('id') id: string,
  ) {
    return this.surveyQuestionsService.deleteSurveyQuestion(user, id);
  }
}
