import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { JwtService } from './jwt/jwt.service';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
