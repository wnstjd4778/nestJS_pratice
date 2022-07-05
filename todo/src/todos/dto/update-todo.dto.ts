import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';

export class UpdateTodoDto {
  title?: string;
  content?: string;
  done?: string;

  @IsString({ each: true })
  @IsOptional()
  attachments: [string];
}
