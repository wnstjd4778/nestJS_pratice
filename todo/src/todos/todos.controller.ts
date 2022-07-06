import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  LoggerService,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
//import { Logger as WinstonLogger} from 'winston';
import { QueryTodoDto } from './dto/query-todo.dto';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Request } from 'express';
import { User } from '../decorator/user.decorater';
import { Roles } from '../decorator/roles.decorator';
import { WINSTON_MODULE_PROVIDER, WinstonLogger } from 'nest-winston';
import { Todo } from '../types/todo';
import { IUserProfile } from '../types/user';
import { TodoDocument } from './schema/todo.schemas';

@Controller('todos')
export class TodosController {
  constructor(
    private readonly todosService: TodosService,
    private readonly logger: Logger,
  ) {}

  @Get('me')
  @UseGuards(AuthGuard)
  findMyAll(
    @User() user: IUserProfile,
    @Query() query: QueryTodoDto,
  ): Promise<TodoDocument[]> {
    query.user = user._id;
    return this.todosService.findAll(query);
  }
  @Get()
  @UseGuards(AuthGuard)
  @Roles('admin')
  findAll(@Query() query: QueryTodoDto) {
    return this.todosService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@User() user: IUserProfile, @Body() dto: CreateTodoDto) {
    dto.user = user._id;
    return this.todosService.create(dto);
  }

  @Put(':id')
  updateTodo(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return this.todosService.updateTodo(id, dto);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todosService.deleteTodo(id);
  }
}
