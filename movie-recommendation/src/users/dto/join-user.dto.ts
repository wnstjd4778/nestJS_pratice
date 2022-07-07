import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../types/user';
import { Auth } from '../../types/auth';

type FieldType = Pick<User & Auth, 'email' | 'name' | 'phone' | 'password'>

export class JoinUserDto implements FieldType {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
