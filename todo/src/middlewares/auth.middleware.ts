import { Injectable, NestMiddleware } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  use(req: any, res: any, next: () => void) {
    console.log('call auth middleware');
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.replace(/^Bearer /, '');
        req.user = this.authService.verifyToken(token);
      } catch (e) {
        delete req.user;
      }
    }
    next();
  }
}
