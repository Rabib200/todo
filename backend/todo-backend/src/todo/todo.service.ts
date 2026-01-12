import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(userId: string): Promise<Todo[]> {
    return this.todoRepository.find({ where: { userId } });
  }

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
    const newTodo = this.todoRepository.create({
      ...createTodoDto,
      userId,
    });
    return this.todoRepository.save(newTodo);
  }

  async findById(id: string, userId: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id, userId } });
    if (!todo) {
      throw new BadRequestException('Todo not found');
    }
    return todo;
  }

  async update(
    id: string,
    userId: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    const todo = await this.findById(id, userId);

    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async Delete(id: string, userId: string): Promise<void> {
    const todo = await this.findById(id, userId);
    await this.todoRepository.softRemove(todo);
  }
}
