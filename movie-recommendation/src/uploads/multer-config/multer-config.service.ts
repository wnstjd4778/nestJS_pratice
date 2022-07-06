import { Inject, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import multerConfig from '../../config/multer.config';
import { ConfigType } from '@nestjs/config';
import { exists, existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuidV4 } from 'uuid';
import { extname } from 'path';
import MulterConfig from '../../config/multer.config';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(
    @Inject(multerConfig.KEY)
    private readonly config: ConfigType<typeof MulterConfig>,
  ) {}
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    if (!existsSync(this.config.dest)) {
      mkdirSync(this.config.dest, { recursive: true });
    }
    const storage = diskStorage({
      destination: (req, file, callback) => {
        callback(null, this.config.dest);
      },
      filename: (req, file, callback) => {
        const filename = `${uuidV4()}${extname(file.originalname)}`;
        callback(null, filename);
      },
    });

    return { storage };
  }
}
