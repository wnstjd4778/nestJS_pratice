import {
  Inject,
  MiddlewareConsumer,
  Module,
  NestModule, OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { join } from 'path';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import authConfig from './config/auth.config';
import { validationSchema } from './config/validation-schema';
import { AuthMiddleware } from './middlewares/auth.middleware';
import adminConfig from './config/admin.config';
import { AuthService } from './auth/auth.service';
import { Connection } from 'mongoose';
import { hashSync } from 'bcrypt';
import { SurveysModule } from './surveys/surveys.module';
import { LoggingModule } from './logging/logging.module';
import { CommentsModule } from './comments/comments.module';
import {PageMiddleware} from "./middlewares/page.middleware";
import { UploadsModule } from './uploads/uploads.module';
import multerConfig from "./config/multer.config";
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '../config', `.env`)],
      load: [authConfig, adminConfig, multerConfig],
      validationSchema,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    SurveysModule,
    LoggingModule,
    CommentsModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule, OnApplicationBootstrap {
  constructor(
    private authService: AuthService,
    @InjectConnection() private connection: Connection,
    @Inject(adminConfig.KEY) private config: ConfigType<typeof adminConfig>,
  ) {}
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes('/**');
    consumer.apply(PageMiddleware).forRoutes('/**');
  }

  onApplicationBootstrap(): any {
    this.createAdmin();
  }

  async createAdmin() {
    const { email, password, name, phone } = this.config;
    const { User, Auth } = this.connection.models;
    const exUser = await User.findOne({ email });
    if (!exUser) {
      const user = await User.create({ email, password, name, phone });
      const auth = await Auth.create({
        provider: 'local',
        providerId: String(user._id),
        user: user._id,
        password: hashSync(password, 12),
      });
      user.auth = auth._id;
      user.point = 1000000;
      await user.save();
    }
  }
}
