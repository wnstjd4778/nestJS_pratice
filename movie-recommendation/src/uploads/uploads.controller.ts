import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guard/auth.guard';
import { User } from '../decorators/user.decorator';
import { IAccessTokenPayload } from '../types/auth-tokens';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @User() user: IAccessTokenPayload,
  ) {
    return this.uploadsService.uploadFile(user._id, file);
  }
}
