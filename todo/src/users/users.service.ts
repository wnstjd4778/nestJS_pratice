import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from './schema/user.schema';
import { JoinUserDto } from './dto/join-user.dto';
import { IAuthTokens } from '../types/auth-tokens';
import { AuthService } from '../auth/auth.service';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';
import { CreateAuthCommand } from '../auth/commands/create-auth.command';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private readonly authService: AuthService,
    private commandBus: CommandBus,
  ) {}

  // async login(dto: LoginUserDto): Promise<IAuthTokens> {
  //   const { email, password } = dto;
  //   const exUser = await this.userModel.findOne({ email });
  //   if (!exUser) {
  //     throw new NotFoundException('찾을 수 없는 사용자입니다.');
  //   }
  //
  //   if (!(await this.authService.authenticate(exUser.auth, password))) {
  //     throw new UnauthorizedException('잘못된 비밀번호입니다.');
  //   }
  //   const { _id, role } = exUser;
  //   const accessToken = this.authService.signAccessToken({
  //     _id,
  //     role,
  //   });
  //   const refreshToken = await this.authService.signRefreshToken(_id);
  //
  //   return {
  //     accessToken,
  //     refreshToken,
  //   };
  // }

  async join(dto: JoinUserDto): Promise<boolean> {
    const { email, name, phone, password } = dto;
    await this.commandBus.execute(
      new CreateUserCommand(email, name, phone, password),
    );
    // const exUser = await this.userModel.findOne({ email });
    // if (exUser) {
    //   throw new BadRequestException('이미 등록된 이메일입니다.');
    // }
    // const user = await this.userModel.create({ email, name, phone });
    // const auth = await this.authService.createAuthentication(user, password);
    // user.auth = auth._id;
    // await user.save();

    return true;
  }

  async refreshToken(refreshToken: string): Promise<IAuthTokens> {
    const userId = await this.authService.getUserIdByRefreshToken(refreshToken);
    const user = await this.userModel.findById(userId);
    const payload = { _id: user._id, role: user.role };

    return this.authService.refreshToken(refreshToken, payload);
  }
}
