import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import {IAccessTokenPayload} from "../../types/auth-tokens";

export class UpdateMovieDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsNumber()
  score: number;

  @IsOptional()
  user: IAccessTokenPayload;
}
