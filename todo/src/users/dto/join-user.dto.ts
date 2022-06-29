import {IsEmail, IsNotEmpty, IsString, Matches} from 'class-validator';

export class JoinUserDto {

  @IsEmail()
  email: string;


  @Matches(/^[a-zA-Z0-9!@#%^&*()]+$/)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d+$/)
  phone: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
