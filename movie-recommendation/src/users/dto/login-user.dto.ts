import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../types/user';
import { Auth } from '../../types/auth';
import { ApiProperty } from '@nestjs/swagger';

type FieldType = Pick<User & Auth, 'email' | 'password'>;
export class LoginUserDto implements FieldType {
  @ApiProperty()
  @IsEmail()
  email: string;


  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
