import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer-config/multer-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel, FileSchema} from './schema/file.schema';
import { UploadService } from './upload.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    MongooseModule.forFeature([{ name: FileModel.name, schema: FileSchema }]),
    AuthModule,
  ],
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
