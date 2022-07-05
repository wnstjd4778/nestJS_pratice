import {
  IsArray,
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsOptional, IsString,
  ValidateNested,
} from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsBoolean()
  done: boolean;

  user?: string;

  @IsString({ each: true })
  @IsOptional()
  attachments: [string];
}
