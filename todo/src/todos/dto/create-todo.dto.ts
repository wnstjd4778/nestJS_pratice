import {IsBoolean, IsEmpty, IsNotEmpty, IsOptional} from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsBoolean()
  done: boolean;
}
