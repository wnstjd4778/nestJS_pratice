import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidV4 } from 'uuid';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AuthDocument, AuthModel } from './schemas/auth.schema';
import { Connection, Model } from 'mongoose';
import {
  RefreshToken,
  RefreshTokenDocument,
} from './schemas/refresh-token.schema';
import { compareSync, hashSync } from 'bcrypt';
import { IUserProfile } from '../types/user';
import { IAuthTokens } from '../types/auth-tokens';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth.config';
import { UserDocument, UserModel } from '../users/schema/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(AuthModel.name) private authModel: Model<AuthDocument>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<IUserProfile> {
    const { UserModel } = this.connection.models;
    const exUser: UserDocument = await UserModel.findOne({ email });
    if (!exUser) {
      throw new NotFoundException('찾을 수 없는 사용자입니다.');
    }
    const exAuth: AuthDocument = await this.authModel.findById(exUser.auth);
    if (!exAuth.validatePassword(password)) {
      throw new UnauthorizedException('잘못된 비밀번호입니다.');
    }
    return {
      _id: exUser._id,
      role: exUser.role,
    };
  }
  private signAccessToken(payload: IUserProfile): string {
    return jwt.sign(payload, this.config.jwt_secret, {
      expiresIn: '1d',
      audience: 'todo.com',
      issuer: 'todo.com',
    });
  }

  private async signRefreshToken(userId: string): Promise<string> {
    const token = uuidV4();
    await this.refreshTokenModel.create({
      user: userId,
      value: token,
    });
    return token;
  }

  async authenticate(authId: string, password: string): Promise<boolean> {
    const exAuth = await this.authModel.findById(authId);
    return compareSync(password, exAuth.password);
  }

  async createAuthentication(
    user: UserDocument,
    password: string,
  ): Promise<AuthDocument> {
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
    payload: IUserProfile,
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
    };
  }

  verifyToken(token: string): IUserProfile {
    try {
      const { _id, role } = verify(
        token,
        this.config.jwt_secret,
      ) as IUserProfile;
      return { _id, role };
    } catch (e) {
      console.log(e);
      let message = '유효하지 않은 엑세스토큰입니다.';
      if (e.name === 'TokenExpiredError') {
        message = '엑세스 토큰이 만료되었습니다.';
      }
      throw new UnauthorizedException(message);
    }
  }

  async login(profile: IUserProfile): Promise<IAuthTokens> {
    return {
      accessToken: this.signAccessToken(profile),
      refreshToken: await this.signRefreshToken(profile._id),
    };
  }
}
