import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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
}
