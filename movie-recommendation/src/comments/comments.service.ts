import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from '../users/schema/user.schema';
import { Model } from 'mongoose';
import {
  SurveyFormDocument,
  SurveyFormModel,
} from '../surveys/schemas/survey-form.schema';
import { CommentDocument, CommentModel } from './schemas/comment.schema';
import { IPaging } from '../types/paging';
import { createHttpException } from '../errors/create-error';
import { ErrorCodes } from '../errors/error-definition';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    @InjectModel(SurveyFormModel.name)
    private surveyFormModel: Model<SurveyFormDocument>,
    @InjectModel(CommentModel.name)
    private commentModel: Model<CommentDocument>,
  ) {}
  async findAllBySurveyFormId(
    paging: IPaging,
    surveyFormId: string,
  ): Promise<CommentDocument[]> {
    const surveyForm = await this.surveyFormModel.findById(surveyFormId);
    if (!surveyForm) {
      throw createHttpException(NotFoundException, {
        code: ErrorCodes.NOT_FOUND_SURVEY_FORM,
      });
    }
    const { limit, skip, sort } = paging;
    return this.commentModel
      .find({ surveyForm: surveyFormId })
      .limit(limit)
      .sort(sort)
      .skip(skip);
  }

  async createComment(
    userId: string,
    surveyFormId: string,
    dto: CreateCommentDto,
  ): Promise<CommentDocument> {
    const surveyForm = await this.surveyFormModel.findById(surveyFormId);
    if (!surveyForm) {
      throw createHttpException(NotFoundException, {
        code: ErrorCodes.NOT_FOUND_SURVEY_FORM,
      });
    }
    const comment = await this.commentModel.create({ ...dto, user: userId });
    surveyForm.comments.push(comment._id);
    await surveyForm.save();
    return comment;
  }

  async deleteComment(
    userId: string,
    commentId: string,
  ): Promise<CommentDocument> {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw createHttpException(NotFoundException, {
        code: ErrorCodes.NOT_FOUND_COMMENT,
      });
    }
    if (String(comment.user) !== userId) {
      throw new UnauthorizedException('해당 댓글을 삭제할 수 없습니다.');
    }
    const surveyForm = await this.surveyFormModel.findById(comment.surveyForm);
    const idx = surveyForm.comments.findIndex(comment._id);
    if (idx !== -1) {
      surveyForm.comments.splice(idx, 1);
      await surveyForm.save();
    }
    await comment.deleteOne();

    return comment;
  }

  async updateComment(
    userId: string,
    commentId: string,
    dto: UpdateCommentDto,
  ): Promise<CommentDocument> {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw createHttpException(NotFoundException, {
        code: ErrorCodes.NOT_FOUND_COMMENT,
      });
    }
    if (String(comment.user) !== userId) {
      throw new UnauthorizedException('해당 댓글을 수정할 수 없습니다.');
    }
    await comment.updateOne(dto);
    return this.commentModel.findById(commentId);
  }
}
