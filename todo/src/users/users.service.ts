import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './schema/auth.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { JoinUserDto } from './dto/join-user.dto';
import { hashSync, compareSync } from 'bcrypt';
import { IAuthTokens } from './dto/auth-tokens';
import { JwtService } from '../jwt/jwt.service';
import {
  RefreshToken,
  RefreshTokenDocument,
} from './schema/refresh-token.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<AuthDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshTokenDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto): Promise<IAuthTokens> {
    const { email, password } = dto;
    const exUser = await this.userModel.findOne({ email });
    if (!exUser) {
      throw new NotFoundException('찾을 수 없는 사용자입니다.');
    }

    const exAuth = await this.authModel.findById(exUser.auth);
    if (compareSync(password, exAuth.password)) {
      throw new UnauthorizedException('잘못된 비밀번호입니다.');
    }
    const { _id, role } = exUser;
    const accessToken = this.jwtService.signAccessToken({
      _id,
      role,
    });
    const refreshToken = this.jwtService.signRefreshToken({ _id });
    await this.refreshTokenModel.create({ user: _id, value: refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }

  async join(dto: JoinUserDto): Promise<boolean> {
    const { email, name, phone, password } = dto;
    const exUser = await this.userModel.findOne({ email });
    if (exUser) {
      throw new BadRequestException('이미 등록된 이메일입니다.');
    }
    const user = await this.userModel.create({ email, name, phone });
    const auth = await this.authModel.create({
      providerId: String(user._id),
      password: hashSync(password, 12),
      user,
    });
    user.auth = auth._id;
    await user.save();

    return true;
  }
}
