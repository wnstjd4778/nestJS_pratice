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
import { utilities as nestWinstonUtilities, WinstonModule } from 'nest-winston';
import { LoggingModule } from './logging/logging.module';
import { LoggingTestModule } from './logging-test/logging-test.module';
import * as winston from 'winston';

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
      load: [authConfig, adminConfig],
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
    const { Auth, User } = this.connection.models;
    const { email, name, phone, password } = this.config;
    const exAdmin = await User.findOne({ email });
    if (!exAdmin) {
      const user = await User.create({ email, name, phone, password });
      const auth = await Auth.create({
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
