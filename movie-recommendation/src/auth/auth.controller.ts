import { Body, Controller, Post } from '@nestjs/common';
import { LogInDto } from './dto/log-in.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  logIn(@Body() dto: LogInDto) {
    return this.authService.checkEmailAndPassword(dto);
  }

  @Post('/register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}
