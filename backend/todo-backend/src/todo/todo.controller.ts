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
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/middleware/jwt-auth.guard';
import { Request } from 'express';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller({
  path: 'todos',
  version: '1',
})
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiQuery({ name: 'status', required: false, enum: ['PENDING', 'IN_PROGRESS', 'DONE'] })
  async findAll(
    @Req() req: Request & { user: { userId: string; email: string } },
    @Query('status') status?: string,
  ) {
    const userId = req.user?.userId;
    const email = req.user?.email;

    Logger.debug(
      `Fetching todos for userId: ${userId}, email: ${email}, status: ${status}`,
    );

    return this.todoService.findAll(userId, status);
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

  @Put(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() req: Request & { user: { userId: string; email: string } },
  ) {
    const userId = req.user?.userId;
    const email = req.user?.email;

    Logger.debug(`Updating todo for userId: ${userId}, email: ${email}`);

    return this.todoService.update(id, userId, updateTodoDto);
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
