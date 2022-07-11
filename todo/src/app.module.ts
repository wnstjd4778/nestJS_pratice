import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
} from '@nestjs/common';
import {
  InjectConnection,
  InjectModel,
  MongooseModule,
} from '@nestjs/mongoose';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { join } from 'path';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { validationSchema } from './config/validation-schema';
import authConfig from './config/auth.config';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { Connection } from 'mongoose';
import adminConfig from './config/admin.config';
import { hashSync } from 'bcrypt';
import { LoggingModule } from './logging/logging.module';
import { LoggingTestModule } from './logging-test/logging-test.module';
import { UploadModule } from './upload/upload.module';
import { BatchModule } from './batch/batch.module';
import multerConfig from './config/multer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        join(
          __dirname,
          '../config',
          `.${process.env.NODE_ENV || 'development'}.env`,
        ),
      ],
      load: [authConfig, adminConfig, multerConfig],
      validationSchema,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    TodosModule,
    UsersModule,
    AuthModule,
    LoggingTestModule,
    LoggingModule,
    UploadModule,
    BatchModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(
    @InjectConnection() private connection: Connection,
    @Inject(adminConfig.KEY) private config: ConfigType<typeof adminConfig>,
  ) {}
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes('/**');
  }

  onApplicationBootstrap(): any {
    this.createAdmin();
  }
  private async createAdmin(): Promise<void> {
    const { AuthModel, UserModel } = this.connection.models;
    const { email, name, phone, password } = this.config;
    const exAdmin = await UserModel.findOne({ email });
    if (!exAdmin) {
      const user = await UserModel.create({ email, name, phone, password });
      const auth = await AuthModel.create({
        provider: 'local',
        providerId: String(user._id),
        password: hashSync(password, 12),
        user: user._id,
      });
      user.auth = auth._id;
      await user.save();
    }
  }
}
