import {
  IsBoolean,
  IsBooleanString,
  IsOptional,
  IsString,
} from 'class-validator';

export class QueryTodoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsBooleanString()
  @IsOptional()
  done?: boolean;
}
