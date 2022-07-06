import { Logger, Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoModel, TodoSchema} from './schema/todo.schemas';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TodoModel.name, schema: TodoSchema }]),
    AuthModule,
    UploadModule,
  ],
  controllers: [TodosController],
  providers: [TodosService, Logger],
})
export class TodosModule {}
