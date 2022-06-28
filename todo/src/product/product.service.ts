import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ulid } from 'ulid';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from '../todo.schemas';
import { Model } from 'mongoose';
import { CreateTodoDto } from "../create-todo.dto";
import { UpdateTodoDto } from "../update-todo.dto";

export interface IProduct {
  id?: string;
  name: string;
  content: string;
  price: number;
  category: string;
  viewCount: number;
}

@Injectable()
export class ProductService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  getProducts(): Promise<TodoDocument[]> {
    this.todoModel.find().exec();
  }

  async getProduct(id: string): Promise<TodoDocument> {
    const idx: number = this.products.findIndex((product) => product.id === id);
    if (idx === -1) {
      throw new NotFoundException(`해당 ${id} id의 상품을 찾을 수 없습니다.`);
    }
    this.products[idx] = {
      ...this.products[idx],
      viewCount: ++this.products[idx].viewCount,
    };
    return this.products[idx];
  }

  createProduct(dto: CreateTodoDto) {
    return this.todoModel.create(dto);
  }

  async updateProduct(id: string, dto: UpdateTodoDto): Promise<TodoDocument> {
    const todo: TodoDocument = await this.todoModel.findById(id).exec();
    await todo.updateOne({$set: dto}).exec();
    return this.todoModel.findById(id).exec();
  }

  async deleteProduct(id: string): Promise<TodoDocument> {
    const todo = await this.todoModel.findById(id);
    await todo.deleteOne();

  }
}
