import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { CreateSurveyResultDto } from './dto/create-survey-result.dto';
import { SurveyResultsService } from './survey-results.service';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { User } from '../../decorators/user.decorator';
import { IAccessTokenPayload } from '../../types/auth-tokens';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {IPaging} from "../../types/paging";
import {Paging} from "../../decorators/paging.decorator";

@ApiBearerAuth()
@ApiTags('survey-results')
@Controller('survey-results')
export class SurveyResultsController {
  constructor(private readonly surveyResultsService: SurveyResultsService) {}

  @Post('/survey-forms/:id')
  @UseGuards(AuthGuard)
  createSurveyResult(
    @User() user: IAccessTokenPayload,
    @Param('id') id: string,
    @Body() dto: CreateSurveyResultDto
  ) {
    dto.user = user._id;
    return this.surveyResultsService.createSurveyResult(id, dto);
  }
}
