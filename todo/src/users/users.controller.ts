import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from './users.service';
import { JoinUserDto } from './dto/join-user.dto';
import {IAuthTokens} from "./dto/auth-tokens";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  login(@Body() dto: LoginUserDto): Promise<IAuthTokens> {
    return this.usersService.login(dto);
  }

  @Post('join')
  join(@Body() dto: JoinUserDto): Promise<boolean> {
    return this.usersService.join(dto);
  }
}
