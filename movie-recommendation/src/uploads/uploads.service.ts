import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { File, FileDocument } from './schemas/file.schemas';
import { Model } from 'mongoose';
import { IFile} from '../types/file';

@Injectable()
export class UploadsService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async uploadFile(userId: string, file: Express.Multer.File): Promise<IFile> {
    return this.fileModel.create({
      key: file.filename,
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      creator: userId,
    });
  }
}
