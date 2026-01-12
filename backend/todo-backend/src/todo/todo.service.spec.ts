import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Repository } from 'typeorm';
import { Todo } from './entity/todo.entity';
import { find } from 'rxjs';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoStatus } from '@app/common/enums/todo-status.enum';

describe('TodoService', () => {
  let service: TodoService;
  let repository: Repository<Todo>;

  const mockTodoRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    softRemove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodoRepository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
    repository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const userId = 'user1';
      const mockTodos = [
        {
          id: '1',
          title: 'Test Todo',
          description: 'This is a test todo',
          userId,
          status: TodoStatus.PENDING,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      mockTodoRepository.find.mockResolvedValue(mockTodos);

      const result = await service.findAll(userId);

      expect(result).toEqual(mockTodos);
      expect(mockTodoRepository.find).toHaveBeenCalledWith({
        where: { userId },
      });
      expect(mockTodoRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create and return a new todo', async () => {
      const userId = 'user1';
      const createTodoDto = {
        title: 'New Todo',
        description: 'This is a new todo',
      };
      const mockTodo = {
        id: '1',
        ...createTodoDto,
        userId,
        status: TodoStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockTodoRepository.create.mockReturnValue(mockTodo);
      mockTodoRepository.save.mockResolvedValue(mockTodo);

      const result = await service.create(createTodoDto, userId);

      expect(result).toEqual(mockTodo);
      expect(mockTodoRepository.create).toHaveBeenCalledWith({
        ...createTodoDto,
        userId,
      });
      expect(mockTodoRepository.save).toHaveBeenCalledWith(mockTodo);
    });
  });
});
