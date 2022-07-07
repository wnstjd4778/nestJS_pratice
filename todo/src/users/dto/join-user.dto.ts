import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JoinUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Matches(/^[a-zA-Z0-9!@#%^&*()]+$/)
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/)
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
