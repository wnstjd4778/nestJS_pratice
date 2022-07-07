import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { IAuthToken } from './dto/auth-tokens';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel} from './schema/user.schema';
import { Model } from 'mongoose';
import { JoinUserDto } from './dto/join-user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  async login(dto: LoginUserDto): Promise<IAuthToken> {
    const { email, password } = dto;
    const exUser = await this.userModel.findOne({ email });
    if (!exUser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    if (!(await this.authService.authenticate(exUser.auth, password))) {
      throw new UnauthorizedException('잘못된 비밀번호입니다.');
    }
    const { _id, role } = exUser;
    const [accessToken, refreshToken] = await Promise.all([
      this.authService.signAccessToken({ _id, role }),
      this.authService.signRefreshToken(_id),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async join(dto: JoinUserDto): Promise<boolean> {
    const { email, password, name, phone } = dto;
    const exUser = await this.userModel.findOne({ $or: [{ email }, { name }] });
    if (exUser) {
      throw new BadRequestException('해당 아이디로 가입할 수 없습니다.');
    }
    const user = await this.userModel.create({ email, name, phone });
    const auth = await this.authService.createAuthentication(user, password);
    user.auth = auth._id;
    await user.save();
    return true;
  }

  async refreshToken(refreshToken: string): Promise<IAuthToken> {
    const userId = await this.authService.getUserIdByRefreshToken(refreshToken);
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }
    const payload = { _id: user._id, role: user.role };
    return this.authService.refreshToken(refreshToken, payload);
  }

  async checkPointAndPay(paymentPoint: number, userId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (user.point >= paymentPoint) {
      user.point -= paymentPoint;
      await user.save();
      return;
    } else {
      throw new BadRequestException('결제 금액이 부족합니다.');
    }
  }

  async exchangePointByDeleteSurvey(
    paymentPoint: number,
    userId: string,
  ): Promise<void> {
    const user = await this.userModel.findById(userId);
    user.point += paymentPoint;
    await user.save();
    return;
  }

  async increasePointBySurvey(
    surveyPoint: number,
    userId: string,
  ): Promise<void> {
    const user = await this.userModel.findById(userId);
    user.point += surveyPoint;
    await user.save();
    return;
  }
}
