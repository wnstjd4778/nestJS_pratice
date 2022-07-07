import {
  IsBoolean,
  IsBooleanString, IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class QueryTodoDto {
  @ApiProperty({
    description: '제목으로 검색'
  })
  @IsOptional()
  @IsObject()
  @Transform((value) => RegExp(value.value)) // regexp하면 object 타입으로 변환
  title?: string;

  @ApiProperty()
  @IsBooleanString()
  @IsOptional()
  done?: boolean;

  @ApiProperty()
  @IsOptional()
  user?: string;
}
