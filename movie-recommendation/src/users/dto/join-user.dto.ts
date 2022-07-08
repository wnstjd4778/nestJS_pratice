import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../types/user';
import { Auth } from '../../types/auth';
import {ApiProperty} from "@nestjs/swagger";

type FieldType = Pick<User & Auth, 'email' | 'name' | 'phone' | 'password'>

export class JoinUserDto implements FieldType {

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;
}
