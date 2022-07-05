import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schema/todo.schemas';
import { Connection, Model } from 'mongoose';
import { QueryTodoDto } from './dto/query-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {UploadService} from "../upload/upload.service";

@Injectable()
export class TodosService {
  constructor(
    @InjectModel(Todo.name) private todoModel: Model<TodoDocument>,
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
    const { File } = this.connection.models;
    const todoDocument = await this.todoModel.create(dto);

    return todoDocument;
  }

  async updateTodo(id: string, dto: UpdateTodoDto): Promise<TodoDocument> {
    const todoDocument: TodoDocument = await this.todoModel.findById(id);
    if (!todoDocument) {
      throw new NotFoundException(`${id}의 투두를 찾을 수 없습니다.`);
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
