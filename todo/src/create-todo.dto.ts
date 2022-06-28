import { IsBoolean, IsEmpty, IsNotEmpty } from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsBoolean()
  done: boolean;
}
