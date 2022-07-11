import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';
import { JoinUserDto } from './dto/join-user.dto';
import { IAuthTokens } from '../types/auth-tokens';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { User } from '../decorator/user.decorater';
import { IUserProfile } from '../types/user';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @User() user: IUserProfile,
    @Body() dto: LoginUserDto,
  ): Promise<IAuthTokens> {
    // return this.usersService.login(dto);
    return this.authService.login(user);
  }

  @Post('join')
  join(@Body() dto: JoinUserDto): Promise<boolean> {
    return this.usersService.join(dto);
  }

  @ApiHeader({ name: 'x-refresh-token' })
  @Post('refresh-token')
  refreshToken(@Headers('x-refresh-token') token: string) {
    return this.usersService.refreshToken(token);
  }
}
