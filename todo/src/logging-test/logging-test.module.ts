import { Module } from '@nestjs/common';
import { LoggingTestInterceptor } from './logging-test.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [{ useClass: LoggingTestInterceptor, provide: APP_INTERCEPTOR }],
})
export class LoggingTestModule {}
