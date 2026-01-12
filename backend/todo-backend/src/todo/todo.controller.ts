import {
  Controller,
  Req,
  UseGuards,
  Get,
  Logger,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/middleware/jwt-auth.guard';
import { Request } from 'express';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller({
  path: 'todos',
  version: '1',
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(
    @Req() req: Request & { user: { userId: string; email: string } },
  ) {
    const userId = req.user?.userId;
    const email = req.user?.email;

    Logger.debug(`Fetching todos for userId: ${userId}, email: ${email}`);

    return this.todoService.findAll(userId);
  }

  @Post()
  async createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req: Request & { user: { userId: string; email: string } },
  ) {
    const userId = req.user?.userId;
    const email = req.user?.email;

    Logger.debug(`Creating todo for userId: ${userId}, email: ${email}`);

    return this.todoService.create(createTodoDto, userId);
  }

  @Get(':id')
  async getTodoById(
    @Param('id') id: string,
    @Req() req: Request & { user: { userId: string; email: string } },
  ) {
    const userId = req.user?.userId;
    const email = req.user?.email;

    Logger.debug(`Fetching todo by ID for userId: ${userId}, email: ${email}`);

    return this.todoService.findById(id, userId);
  }

  @Delete(':id')
  async deleteTodo(
    @Param('id') id: string,
    @Req() req: Request & { user: { userId: string; email: string } },
  ) {
    const userId = req.user?.userId;
    const email = req.user?.email;

    Logger.debug(`Deleting todo for userId: ${userId}, email: ${email}`);

    return this.todoService.Delete(id, userId);
  }
}
