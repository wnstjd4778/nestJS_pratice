import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MoviesModule } from './movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { doc } from 'prettier';
import { join } from 'path';

@Module({
  imports: [
    ProductModule,
    MoviesModule,
    ConfigModule.forRoot({
      envFilePath: [
        join(
          __dirname,
          '../config',
          `.${process.env.NODE_ENV || 'development'}.env `,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
