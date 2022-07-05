import { Logger, Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schema/todo.schemas';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    AuthModule,
    UploadModule,
  ],
  controllers: [TodosController],
  providers: [TodosService, Logger],
})
export class TodosModule {}
