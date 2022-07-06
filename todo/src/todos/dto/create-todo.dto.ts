import {
  IsArray,
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsOptional, IsString,
  ValidateNested,
} from 'class-validator';
import {Todo} from "../../types/todo";

type RequiredFieldType = Pick<Todo, 'title' | 'content'>

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsBoolean()
  done: boolean;

  @IsEmpty()
  user?: string;

  @IsString({ each: true })
  @IsOptional()
  attachments: [string];
}
