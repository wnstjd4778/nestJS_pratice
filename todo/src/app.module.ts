import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { validationSchema } from './config/validation-schema';
import authConfig from './config/auth.config';

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
      load: [authConfig],
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
