import {Body, Controller, Headers, Post, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JoinUserDto } from './dto/join-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {AuthGuard} from "../auth/guard/auth.guard";
import {User} from "../decorators/user.decorator";
import {IAccessTokenPayload} from "../types/auth-tokens";
import {ChargePointDto} from "./dto/charge-point.dto";

@ApiBearerAuth()
@ApiTags('users')
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

  @UseGuards(AuthGuard)
  @Post('points/charge')
  chargePoint(@User() user: IAccessTokenPayload, @Body() dto: ChargePointDto) {
    return this.usersService.chargePoint(user._id, dto);
  }
}
