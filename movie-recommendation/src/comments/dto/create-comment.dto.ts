import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  user?: string;
}
