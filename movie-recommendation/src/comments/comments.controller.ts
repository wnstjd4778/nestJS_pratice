import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from '../decorators/user.decorator';
import { IAccessTokenPayload } from '../types/auth-tokens';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Paging } from '../decorators/paging.decorator';
import { IPaging } from '../types/paging';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Get('/survey-forms/:surveyFormId')
  findAllBySurveyFormId(
    @Paging() paging: IPaging,
    @Param('surveyFormId') surveyFormId: string,
  ) {
    return this.commentsService.findAllBySurveyFormId(paging, surveyFormId);
  }
  @Post('/survey-forms/:surveyFormId')
  createComment(
    @User() user: IAccessTokenPayload,
    @Param('surveyFormId') surveyFormId: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentsService.createComment(user._id, surveyFormId, dto);
  }

  @Delete('/:commentId')
  deleteComment(
    @User() user: IAccessTokenPayload,
    @Param(':commentId') commentId: string,
  ) {
    return this.commentsService.deleteComment(user._id, commentId);
  }

  @Put('/:commentId')
  updateComment(
    @User() user: IAccessTokenPayload,
    @Param(':commentId') commentId: string,
    @Body() dto: UpdateCommentDto,
  ) {
    return this.commentsService.updateComment(user._id, commentId, dto);
  }
}
