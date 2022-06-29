import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './schema/todo.schemas';
import { Model } from 'mongoose';
import { QueryTodoDto } from './dto/query-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  findAll(query: QueryTodoDto): Promise<TodoDocument[]> {
    return this.todoModel.find(query).exec();
  }

  findOne(id: string): Promise<TodoDocument> {
    return this.todoModel.findById(id).exec();
  }

  create(dto: CreateTodoDto): Promise<TodoDocument> {
    return this.todoModel.create(dto);
  }

  async updateTodo(id: string, dto: UpdateTodoDto): Promise<TodoDocument> {
    const todo: TodoDocument = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException(`${id}의 투두를 찾을 수 없습니다.`);
    }
    await todo.updateOne(dto);
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
