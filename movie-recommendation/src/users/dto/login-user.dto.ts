import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../types/user';
import { Auth } from '../../types/auth';

type FieldType = Pick<User & Auth, 'email' | 'password'>;
export class LoginUserDto implements FieldType {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
