import { Body, Controller, Headers, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JoinUserDto } from './dto/join-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.usersService.login(dto);
  }

  @Post('join')
  join(@Body() dto: JoinUserDto) {
    return this.usersService.join(dto);
  }

  @Post('refresh-token')
  refreshToken(@Headers('x-refresh-token') token: string) {
    return this.usersService.refreshToken(token);
  }
}
