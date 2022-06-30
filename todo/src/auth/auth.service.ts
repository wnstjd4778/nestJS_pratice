import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';
import { TUserRole } from '../users/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schemas/auth.schema';
import { Model } from 'mongoose';
import {
  RefreshToken,
  RefreshTokenDocument,
} from './schemas/refresh-token.schema';
import { compareSync, hashSync } from 'bcrypt';
import { IUser } from '../../types/user';
import { IAUth } from '../../types/auth';
import { IAuthTokens } from '../../types/auth-tokens';

export interface AccessTokenPayload {
  _id: string;
  role: TUserRole;
}

export interface RefreshTokenPayload {
  _id: string;
}

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

  signAccessToken(payload: AccessTokenPayload): string {
    return jwt.sign(payload, this.configService.get('JWT_SECRET'), {
      expiresIn: '1d',
      audience: 'todo.com',
      issuer: 'todo.com',
    });
  }

  async signRefreshToken(userId: string): Promise<string> {
    const token = uuidV4();
    const refreshToken = await this.refreshTokenModel.create({
      user: userId,
      value: token,
    });
    return token;
  }

  async authenticate(authId: string, password: string): Promise<boolean> {
    const exAuth = this.authModel.findById(authId);
    return compareSync(password, exAuth.password);
  }

  async createAuthentication(user: IUser, password: string): Promise<IAUth> {
    return await this.authModel.create({
      providerId: String(user._id),
      password: hashSync(password, 12),
      user: user._id,
    });
  }

  async getUserIdByRefreshToken(refreshToken: string): Promise<string> {
    const document = await this.refreshTokenModel.findOne({
      value: refreshToken,
    });
    if (!document) {
      throw new UnauthorizedException('유효한 리프레시토큰이 아닙니다.');
    }
    return document.user;
  }

  async refreshToken(
    refreshToken: string,
    payload: AccessTokenPayload,
  ): Promise<IAuthTokens> {
    const document = await this.refreshTokenModel.findOne({
      value: refreshToken,
    });
    const aToken = this.signAccessToken(payload);
    const rToken = await this.signRefreshToken(payload._id);
    await document.deleteOne();
    return {
      accessToken: aToken,
      refreshToken: rToken,
    }
  }
}
