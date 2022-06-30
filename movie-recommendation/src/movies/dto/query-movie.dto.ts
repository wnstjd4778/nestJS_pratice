import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IAccessTokenPayload } from '../../types/auth-tokens';
import { Transform } from 'class-transformer';

export class QueryMovieDto {
  @IsNotEmpty()
  @IsOptional()
  @Transform((value) => RegExp(value.value))
  title: string;

  @IsNotEmpty()
  @IsOptional()
  @Transform((value) => RegExp(value.value))
  content: string;

  @IsOptional()
  user: IAccessTokenPayload;
}
