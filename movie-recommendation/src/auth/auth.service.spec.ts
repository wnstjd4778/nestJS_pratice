import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should be register', () => {
      service.register({
        email: 'smy4778@naver.com',
        password: '1234',
        name: 'kim',
      });

    });
  });

  describe('login', () => {
    it('should be login', () => {});
  });
});
