import { Inject, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import multerConfig from '../../config/multer.config';
import { ConfigType } from '@nestjs/config';
import MulterConfig from '../../config/multer.config';
import { existsSync, mkdir, mkdirSync } from 'fs';
import { v4 as uuidV4 } from 'uuid';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(
    @Inject(multerConfig.KEY) private config: ConfigType<typeof MulterConfig>,
  ) {}

  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    if (!existsSync(this.config.dest)) {
      mkdirSync(this.config.dest, { recursive: true });
    }

    const storage = diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.config.dest);
      },
      filename: (req, file, cb) => {
        const filename = `${uuidV4()}${extname(file.originalname)}`;
        cb(null, filename);
      },
    });
    return { storage };
  }
}
