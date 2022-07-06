import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileModel, FileDocument } from './schema/file.schema';
import { Model } from 'mongoose';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(FileModel.name) private fileModel: Model<FileDocument>,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    userId: string,
  ): Promise<FileDocument> {
    return this.fileModel.create({
      filename: file.originalname,
      key: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      creator: userId,
    });
  }

  uploadFiles(
    files: Array<Express.Multer.File>,
    userId: string,
  ): Promise<FileDocument[]> {
    return Promise.all(
      files.map((file) =>
        this.fileModel.create({
          filename: file.originalname,
          key: file.filename,
          mimetype: file.mimetype,
          size: file.size,
          creator: userId,
        }),
      ),
    );
  }

  async updateFiles(refId: string, attachments: [string]): Promise<void> {
    const inDB = ((await this.fileModel.find({ ref: refId })) || []).map(
      (file) => String(file._id),
    );
    const additions = this.differenceOfFile(attachments || [], inDB);
    const deletions = this.differenceOfFile(inDB, attachments || []);
    await Promise.all([
      this.fileModel.updateMany(
        { _id: { $in: additions } },
        { $set: { ref: refId, refType: 'Todo' } },
      ),
      this.fileModel.updateMany(
        { _id: { $in: deletions } },
        { $set: { ref: null, refType: null } },
      ),
    ]);
  }

  differenceOfFile(arr1, arr2) {
    return arr1.filter((v) => !arr2.includes(v));
  }
}
