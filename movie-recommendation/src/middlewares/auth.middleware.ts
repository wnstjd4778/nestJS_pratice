import {
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  use(req: any, res: any, next: () => void) {
    if (!req.headers.authorization) {
      try {
        const token = req.headers.authorization.replace(/^Bearer /, '');
        req.user = this.authService.verifyToken(token);
      } catch (e) {
        delete req.user;
      }
    }
    console.log('auth middleware 통과');
    next();
  }
}
