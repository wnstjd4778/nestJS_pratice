import { Logger, Module } from '@nestjs/common';
import { LoggingInterceptor } from './logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    Logger,
    { useClass: LoggingInterceptor, provide: APP_INTERCEPTOR },
  ],
})
export class LoggingModule {}
