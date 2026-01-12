import { Controller, Req, UseGuards, Get, Logger } from '@nestjs/common';
import { TodoService } from './todo.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/middleware/jwt-auth.guard';
import { Request } from 'express';

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
}
