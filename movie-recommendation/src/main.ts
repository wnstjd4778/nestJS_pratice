import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { logger, settingSwagger } from './setting';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  const configService = app.get(ConfigService);
  const port = +configService.get('PORT') | 3000;
  app.useGlobalInterceptors(new TransformInterceptor());
  settingSwagger(app);
  await app.listen(port);
  Logger.log(`Server is running ${port}`);
}
bootstrap();
