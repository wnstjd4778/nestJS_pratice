import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';
import { MongooseModule } from '@nestjs/mongoose';
import { File, FileSchema } from './schemas/file.schemas';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './multer-config/multer-config.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    AuthModule,
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
