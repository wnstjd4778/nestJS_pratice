import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { TodoDocument, TodoModel } from './schema/todo.schemas';
import { Connection, Model } from 'mongoose';
import { QueryTodoDto } from './dto/query-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UploadService } from '../upload/upload.service';
import { createHttpException } from '../errors/create-error';
import { ErrorCodes } from '../errors/error-definition';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(TodoModel.name) private todoModel: Model<TodoDocument>,
    @InjectConnection() private connection: Connection,
    private readonly uploadService: UploadService,
  ) {}

  findAll(query: QueryTodoDto): Promise<TodoDocument[]> {
    return this.todoModel
      .find(query)
      .populate({ path: 'user', select: 'name' })
      .exec();
  }

  findOne(id: string): Promise<TodoDocument> {
    return this.todoModel.findById(id).exec();
  }

  async create(dto: CreateTodoDto): Promise<TodoDocument> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const { FileModel } = this.connection.models;
      const todoDocument = (await this.todoModel.create([dto], { session }))[0];
      // const todoDocument = new this.todoModel(dto);
      // await todoDocument.save();
      await session.commitTransaction();
      return todoDocument;
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }

  async updateTodo(id: string, dto: UpdateTodoDto): Promise<TodoDocument> {
    const todoDocument: TodoDocument = await this.todoModel.findById(id);
    if (!todoDocument) {
      throw createHttpException(UnauthorizedException, {
        code: ErrorCodes.ACCESS_TOKEN_EXPIRED,
      });
    }
    await this.uploadService.updateFiles(todoDocument._id, dto.attachments);
    await todoDocument.updateOne(dto);
    return await this.todoModel.findById(id).exec();
  }

  async deleteTodo(id: string): Promise<TodoDocument> {
    const todo: TodoDocument = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException(`${id}의 투두를 찾을 수 없습니다.`);
    }
    await todo.deleteOne();
    return todo;
  }
}
