import * as winston from 'winston';
import { utilities as nestWinstonUtilities, WinstonModule } from 'nest-winston';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const logger = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonUtilities.format.nestLike('SurveyApp', {
          prettyPrint: true,
        }),
      ),
    }),
  ],
});

export const settingSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('survey application')
    .setDescription('survey application apis')
    .setVersion('1.0')
    .addTag('survey apis')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
