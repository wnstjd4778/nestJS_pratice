import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileDocument, FileModel } from './schemas/file.schemas';
import { Model } from 'mongoose';

@Injectable()
export class UploadsService {
  constructor(
    @InjectModel(FileModel.name) private fileModel: Model<FileDocument>,
  ) {}

  async uploadFile(
    userId: string,
    file: Express.Multer.File,
  ): Promise<FileDocument> {
    return this.fileModel.create({
      key: file.filename,
      filename: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      creator: userId,
    });
  }

  async connectFiles(refId: string, refType: string, attachments: [string]) {
    await this.fileModel.updateMany(
      { _id: { $in: attachments } },
      { $set: { ref: refId, refType } },
    );
  }

  async updateFiles(
    refId: string,
    refType: string,
    attachments: [string],
  ): Promise<void> {
    const inDB = ((await this.fileModel.find({ ref: refId })) || []).map(
      (file) => String(file._id),
    );
    const additions = this.differenceOfFile(attachments || [], inDB);
    const deletions = this.differenceOfFile(inDB, attachments || []);
    await Promise.all([
      this.fileModel.updateMany(
        { _id: { $in: additions } },
        { $set: { ref: refId, refType } },
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
