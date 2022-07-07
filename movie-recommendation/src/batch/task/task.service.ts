import {Inject, Injectable, Logger} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import multerConfig from '../../config/multer.config';
import { ConfigType } from '@nestjs/config';
import { promises } from 'fs';
import { join } from 'path';
@Injectable()
export class TaskService {
  constructor(
    @InjectConnection() private connection: Connection,
    @Inject(multerConfig.KEY) private config: ConfigType<typeof multerConfig>,
    private readonly logger: Logger,
  ) {}
  @Cron('* * * * *')
  async deleteFilesSchedule() {
    const { FileModel } = this.connection.models;
    const beforeHour = new Date();
    beforeHour.setHours(beforeHour.getHours() - 1);
    const unusedFiles = await FileModel.find({
      refType: null,
      createdAt: { $lte: beforeHour },
    });

    //파일 삭제
    const fileDeletionPromises = unusedFiles.map((file) => {
      const { key } = file;
      const filePath = join(this.config.dest, key);
      return promises.rm(filePath);
    });
    //db 삭제
    const dbDeletionPromises = unusedFiles.map(async (file) => {
      await FileModel.findByIdAndDelete(file._id);
    });
    await Promise.all([...fileDeletionPromises, ...dbDeletionPromises]);
    this.logger.debug(`Delete ${unusedFiles.length}`);
  }
}
