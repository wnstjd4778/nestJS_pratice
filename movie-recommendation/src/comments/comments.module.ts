import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModel, CommentSchema } from './schemas/comment.schema';
import {
  SurveyFormModel,
  SurveyFormSchema,
} from '../surveys/schemas/survey-form.schema';
import { UserModel, UserSchema } from '../users/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CommentModel.name, schema: CommentSchema }]),
    MongooseModule.forFeature([
      { name: SurveyFormModel.name, schema: SurveyFormSchema },
    ]),
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
