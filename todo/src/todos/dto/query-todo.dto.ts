import {
  IsBoolean,
  IsBooleanString, IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryTodoDto {
  @IsOptional()
  @IsObject()
  @Transform((value) => RegExp(value.value)) // regexp하면 object 타입으로 변환
  title?: string;

  @IsBooleanString()
  @IsOptional()
  done?: boolean;
}
