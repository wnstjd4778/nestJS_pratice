import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';
import authConfig from '../config/auth.config';
import { ConfigType } from '@nestjs/config';
import { IAccessTokenPayload, IAuthToken } from '../types/auth-tokens';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import { Model } from 'mongoose';
import {
  RefreshToken,
  RefreshTokenDocument,
} from './schema/refresh-token.schema';
import { compareSync, hashSync } from 'bcrypt';
import { IUser } from '../types/user';
import { IAuth } from '../types/auth';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {}

  signAccessToken(payload: IAccessTokenPayload): string {
    return jwt.sign(payload, this.config.jwt_secret, {
      expiresIn: '1d',
      audience: 'movie.com',
      issuer: 'movie.com',
    });
  }

  async signRefreshToken(userId: string): Promise<string> {
    const token = uuidV4();
    await this.refreshTokenModel.create({
      value: token,
      user: userId,
    });
    return token;
  }

  async authenticate(authId: string, password: string): Promise<boolean> {
    const exAuth = await this.authModel.findById(authId);
    return compareSync(password, exAuth.password);
  }

  async createAuthentication(user: IUser, password: string): Promise<IAuth> {
    return this.authModel.create({
      providerId: String(user._id),
      user: user._id,
      password: hashSync(password, 12),
    });
  }

  async getUserIdByRefreshToken(refreshToken: string): Promise<string> {
    const document = await this.refreshTokenModel.findOne({
      value: refreshToken,
    });
    return document.user;
  }

  async refreshToken(
    refreshToken: string,
    payload: IAccessTokenPayload,
  ): Promise<IAuthToken> {
    const document = await this.refreshTokenModel.findOne({
      value: refreshToken,
    });
    const aToken = this.signAccessToken(payload);
    const rToken = await this.signRefreshToken(payload._id);
    await document.deleteOne();
    return {
      accessToken: aToken,
      refreshToken: rToken,
    };
  }

  verifyToken(token: string) {
    try {
      const { _id, role } = verify(token, this.config.jwt_secret) as IUser;
      return { _id, role };
    } catch (e) {
      throw new UnauthorizedException('토큰이 유효하지 않습니다.');
    }
  }
}
