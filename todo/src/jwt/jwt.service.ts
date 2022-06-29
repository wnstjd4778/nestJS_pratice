import { Injectable } from '@nestjs/common';
import { TUserRole } from '../users/schema/user.schema';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

export interface AccessTokenPayload {
  _id: string;
  role: TUserRole;
}

export interface RefreshTokenPayload {
  _id: string;
}

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}

  signAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, this.configService.get('JWT_SECRET'), {
      expiresIn: '1d',
      audience: 'todo.com',
      issuer: 'todo.com',
    });
  }

  signRefreshToken(payload: RefreshTokenPayload): string {
    return jwt.sign(payload, this.configService.get('JWT_SECRET'), {
      expiresIn: '30d',
      audience: 'todo.com',
      issuer: 'todo.com',
    });
  }
}
