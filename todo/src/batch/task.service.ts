import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { InjectConnection } from '@nestjs/mongoose';
import { connection, Connection } from 'mongoose';
import multerConfig from '../config/multer.config';
import { ConfigType } from '@nestjs/config';
import { promises } from 'fs';
import { join } from 'path';
@Injectable()
export class TaskService {
  constructor(
    private readonly scheduleRegistry: SchedulerRegistry,
    @Inject(multerConfig.KEY) private config: ConfigType<typeof multerConfig>,
    private readonly logger: Logger,
    @InjectConnection() private connection: Connection,
  ) {}

  @Cron('* * * * *', {
    name: 'unused file deletion',
    timeZone: 'Asia/seoul',
  })
  async handleSchedule() {
    const { FileModel } = this.connection.models;
    const beforeHour = new Date();
    beforeHour.setHours(beforeHour.getHours() - 1);
    const unusedFiles = await FileModel.find({
      refType: null,
      createdAt: { $lte: beforeHour },
    }).select(['key', 'filename']);

    // 파일 지우기
    const fileDeletionPromises = unusedFiles.map((file) => {
      const { key } = file;
      const filePath = join(this.config.dest, key);
      return promises.rm(filePath);
    });

    // db에서 지우기
    const dbDeletionPromises = unusedFiles.map((file) => {
      FileModel.findByIdAndDelete(file._id);
    });

    await Promise.all([...fileDeletionPromises, ...dbDeletionPromises]);
    this.logger.debug(`Delete ${unusedFiles.length}`);
  }
}
