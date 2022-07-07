import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateTodoDto {
  @ApiProperty()
  title?: string;
  @ApiProperty()
  content?: string;
  @ApiProperty()
  done?: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  attachments: [string];
}
