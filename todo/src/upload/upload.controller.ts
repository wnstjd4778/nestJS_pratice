import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from '../decorator/user.decorater';
import { IUserProfile } from '../types/auth-tokens';
import { UploadService } from './upload.service';
import { IFile } from '../types/file';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  upload(
    @User() user: IUserProfile,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<IFile> {
    return this.uploadService.uploadFile(file, user._id);
  }

  @Post('array')
  @UseInterceptors(FilesInterceptor('files'))
  @UseGuards(AuthGuard)
  uploadFiles(
    @User() user: IUserProfile,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<IFile[]> {
    return this.uploadService.uploadFiles(files, user._id);
  }
}
