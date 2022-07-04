import { LoggingTestInterceptor } from './logging-test.interceptor';

describe('LoggingTestInterceptor', () => {
  it('should be defined', () => {
    expect(new LoggingTestInterceptor()).toBeDefined();
  });
});
