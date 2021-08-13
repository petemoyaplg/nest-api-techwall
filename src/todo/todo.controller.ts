import { ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { Patch, Post } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Todo } from 'src/entities/todo.entity';
import { DurationInterceptor } from 'src/interceptors/duration.interceptor';
import { UpperCaseAndFusionPipe } from 'src/pipes/upper-case-and-fusion.pipe';
import { AddTodoDto, GetPaginatedTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

// @UseInterceptors(DurationInterceptor)
@Controller('todo')
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  getTodo(): Todo[] {
    console.log(this.configService.get('APP_PORT'));
    return this.todoService.getTodo();
  }

  @Get('/:id')
  getTodoById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Todo {
    return this.todoService.getOnTodoById(id);
  }

  @Get()
  getTodoByPage(@Query() queryParams: GetPaginatedTodoDto): Todo[] {
    return this.todoService.getTodo();
  }

  @Post()
  addTodo(@Body() newTodo: AddTodoDto): Todo {
    const { name, description } = newTodo;
    return this.todoService.addTodo(name, description);
  }

  @Put()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() newTodo: Partial<Todo>,
  ): Partial<Todo> {
    const { name, description } = newTodo;
    return this.todoService.updateTodo(id, name, description);
  }

  @Delete('/:id')
  deleteTodo(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todoService.deleteOnTodoById(id);
  }
  @Post('pipe')
  testCustomPipes(@Body(UpperCaseAndFusionPipe) data) {
    return data;
  }
}
