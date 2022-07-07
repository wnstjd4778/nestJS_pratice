import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { utilities as nestWinstonUtilities } from 'nest-winston/dist/winston.utilities';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { CupInterceptor } from './interceptors/cup.interceptor';
import { ConfigService } from '@nestjs/config';
import { logger, settingSwagger } from './setting';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new CupInterceptor());
  const configService = app.get(ConfigService);
  const port = +(configService.get('PORT') | 3000);
  app.useGlobalInterceptors(new TransformInterceptor());
  if (process.env.NODE_ENV !== 'production') {
    settingSwagger(app);
  }
  await app.listen(port);
  Logger.log(`Server is running ${port}`);
}
bootstrap();
