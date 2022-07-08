import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateCommentDto {

  @ApiProperty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  user?: string;
}
