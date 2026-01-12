# Todo Application - Technical Assessment

A full-stack Todo application built with NestJS (Backend) and Next.js (Frontend) with TypeScript, MySQL, and JWT authentication.

> **Assessment Brief**: Build a To-Do application with a Nest.js backend (MySQL) and a Next.js frontend using TypeScript with the repository pattern to achieve a clean architecture.

## ✅ Requirements Implementation

### Backend Requirements - Nest.js + MySQL

#### ✅ Database & ORM
- **TypeORM** integrated with MySQL database
- Clean entity definitions with proper decorators
- Database migrations support

#### ✅ Todo Entity Structure
```typescript
@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;                    

  @Column()
  title: string;                

  @Column({ nullable: true })
  description: string;          

  @Column({ 
    type: 'enum', 
    enum: TodoStatus, 
    default: TodoStatus.PENDING 
  })
  status: string;               

  @CreateDateColumn()
  createdAt: Date;             

  @UpdateDateColumn()
  updatedAt: Date;              

  @DeleteDateColumn()
  deletedAt: Date;              
}
```

#### ✅ Repository Pattern Implementation
**Interface Definition**: [src/todo/todo.repository.interface.ts](#)
```typescript
export interface TodoRepository {
  create(todo: Partial<Todo>): Promise<Todo>;
  findAll(status?: TodoStatus): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  update(id: string, data: Partial<Todo>): Promise<Todo>;
  delete(id: string): Promise<void>;
}
```

**Implementation**: TodoService uses TypeORM Repository injected via Dependency Injection
- Clean separation of data access layer
- Business logic in service layer
- Repository injected using `@InjectRepository(Todo)`

#### ✅ API Endpoints
- ✅ `POST /api/todos` → Create a new To-Do
- ✅ `GET /api/todos` → List all To-Dos with optional status filter
- ✅ `GET /api/todos/:id` → Get a To-Do by ID
- ✅ `PUT /api/todos/:id` → Update a To-Do (using PATCH)
- ✅ `DELETE /api/todos/:id` → Delete a To-Do (soft delete)

#### ✅ JWT Authentication Middleware
- JWT Guard middleware (`jwt-auth.guard.ts`) implemented at API level
- Protected routes require Bearer token authentication
- JWT Strategy with Passport for token validation
- User authentication endpoints (register/login)

### Frontend Requirements - Next.js

#### ✅ Pages & Components
- **Home Page (`/`)**: 
  - ✅ List of To-Dos with status filter dropdown
  - ✅ Form to add new To-Do
  - ✅ Status update buttons (PENDING → IN_PROGRESS → DONE)
  - ✅ Delete button for each To-Do
  
- **Todo Detail Page (`/todos/[id]`)**: Individual todo view and edit

#### ✅ API Integration
- **Axios** client configured for backend communication
- Centralized API client in `lib/api.ts`
- JWT token management via AuthContext
- Type-safe API calls with TypeScript interfaces

#### ✅ Styling
- **Tailwind CSS** for utility-first styling
- **Radix UI** components for accessible UI primitives
- Responsive, mobile-first design
- Modern, clean interface with card-based layout

### Best Practices Implementation

#### ✅ TypeScript Throughout
- Strict TypeScript configuration
- Interfaces and enums for type safety
- DTO validation with class-validator
- Frontend types in `types/index.ts`

#### ✅ Clean Architecture
```
backend/todo-backend/
├── src/
│   ├── middleware/          # Auth module (JWT, Guards, Strategies)
│   ├── todo/               # Todo module
│   │   ├── todo.controller.ts
│   │   ├── todo.service.ts
│   │   ├── todo.module.ts
│   │   ├── dto/            # Data Transfer Objects
│   │   └── entity/         # Todo entity
│   ├── database/           # Database configuration
│   └── main.ts
└── libs/
    └── common/             # Shared code (Enums, Filters)
```

#### ✅ Repository Pattern
- No raw queries in services
- Repository abstraction via TypeORM
- Dependency injection throughout
- Clean separation of concerns

#### ✅ Testing
- **Jest** test suite included
- Unit tests for TodoService (`todo.service.spec.ts`)
- Repository mocking for isolated testing
- E2E test structure in place
- ✅ Run tests: `yarn test`

#### ✅ Database Migrations
- TypeORM migrations configured
- Synchronization support for development
- Entity-first approach with auto-sync
- Migration scripts available

### Deliverables Checklist

✅ **GitHub Repository**: [Rabib200/todo](https://github.com/Rabib200/todo)

✅ **Project Structure**:
```
todo/
├── backend/todo-backend/      # ✓ Nest.js application
├── frontend/todo-frontend/    # ✓ Next.js application
├── docker-compose.yml         # ✓ MySQL setup
└── README.md                  # ✓ Complete instructions
```

✅ **Docker Compose**: MySQL 8.0 containerized setup with health checks

✅ **Documentation**: Comprehensive README with setup instructions, API documentation, and troubleshooting

## 🚀 Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **TypeORM** - ORM for database interactions
- **MySQL** - Relational database
- **JWT** - Authentication
- **Passport** - Authentication middleware
- **Swagger** - API documentation

### Frontend
- **Next.js 16** - React framework
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **React Hook Form** - Form management
- **Axios** - HTTP client
- **Zod** - Schema validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **Yarn** (v1.22 or higher)
- **Docker** and **Docker Compose** (for MySQL)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd todo
```

### 2. Start MySQL Database

First, start the MySQL database using Docker Compose:

```bash
docker-compose up -d
```

This will start MySQL on port 3306 with the following credentials:
- **Database:** todo_db
- **Username:** todo_user
- **Password:** todo_password
- **Root Password:** rootpassword

To verify the database is running:

```bash
docker ps
```

### 3. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend/todo-backend
yarn install
```

Create a `.env` file from the example:

```bash
cp .env.example .env
```

The `.env` file should contain:

```env
DATABASE_TYPE=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=todo_user
DATABASE_PASSWORD=todo_password
DATABASE_NAME=todo_db
PORT=5001
JWT_EXPIRES_IN=1d
JWT_SECRET=409050d2cc90f3630256935500ca1b0920fd670b17e48d265736070145a81ff40091a518863e843a577cda70834abb37d5c64c77ccc1514420a45618682f7886
```

**Note:** In production, generate a secure JWT_SECRET using:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Start the backend server:

```bash
yarn start:dev
```

The backend will be running on `http://localhost:5001`

API Documentation (Swagger) will be available at: `http://localhost:5001/docs`

### 4. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend/todo-frontend
yarn install
```

Create a `.env.local` file from the example:

```bash
cp .env.example .env.local
```

The `.env.local` file should contain:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

Start the frontend development server:

```bash
yarn dev
```

The frontend will be running on `http://localhost:3000`

## 🚦 Getting Started - First Time Usage

**⚠️ IMPORTANT: You must register an account before using the application.**

1. Navigate to `http://localhost:3000` in your browser
2. Click on "Register" or navigate to the registration page
3. Create a new account with your email and password
4. After registration, log in with your credentials
5. You can now create and manage your todos

**Note:** All todo operations require authentication. Without registering and logging in, you won't be able to access the todo features.

## 🧪 Running Tests

### Backend Tests

```bash
cd backend/todo-backend

# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run test coverage
yarn test:cov

# Run e2e tests
yarn test:e2e
```

## 📁 Project Structure

```
todo/
├── backend/
│   └── todo-backend/
│       ├── src/
│       │   ├── middleware/       # Authentication (JWT, Guards, User Entity)
│       │   ├── todo/             # Todo module (Controller, Service, DTOs)
│       │   ├── database/         # Database configuration
│       │   └── main.ts           # Application entry point
│       ├── libs/
│       │   └── common/           # Shared code (Enums, Filters)
│       └── test/                 # E2E tests
├── frontend/
│   └── todo-frontend/
│       ├── app/                  # Next.js pages
│       ├── components/           # Reusable React components
│       ├── contexts/             # React contexts (Auth)
│       ├── lib/                  # Utilities (API client)
│       └── types/                # TypeScript type definitions
└── docker-compose.yml            # MySQL database configuration
```

## 🔑 Features

- **User Authentication** - Register and login with JWT
- **CRUD Operations** - Create, Read, Update, Delete todos
- **Todo Status** - Pending, In Progress, Completed
- **Soft Delete** - Todos are soft-deleted for data integrity
- **Responsive UI** - Mobile-friendly interface
- **Form Validation** - Client and server-side validation
- **API Documentation** - Auto-generated Swagger docs

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get all todos (authenticated)
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create new todo
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo (soft delete)

## 🐳 Docker Commands

```bash
# Start MySQL
docker-compose up -d

# Stop MySQL
docker-compose down

# View logs
docker-compose logs -f

# Remove volumes (reset database)
docker-compose down -v
```

## 🛑 Stopping the Application

1. Stop the frontend: `Ctrl + C` in the frontend terminal
2. Stop the backend: `Ctrl + C` in the backend terminal
3. Stop MySQL: `docker-compose down`

## 🔧 Troubleshooting

### Port Already in Use

If ports 3000, 5001, or 3306 are already in use:
- Change the backend PORT in `.env`
- Change the frontend port: `yarn dev -p 3001`
- Stop the conflicting Docker container or change MySQL port in `docker-compose.yml`

### Database Connection Issues

- Ensure Docker is running: `docker ps`
- Check MySQL logs: `docker-compose logs mysql`
- Verify credentials in `.env` match `docker-compose.yml`

### Module Resolution Errors

If you encounter path alias errors:
- Ensure all dependencies are installed: `yarn install`
- Check `tsconfig.json` for correct path mappings
- Restart the TypeScript server in VS Code

## 🏗️ Architecture & Design Decisions

### Backend Architecture
- **Modular Structure**: Separation of concerns with dedicated modules (Auth, Todo, Database)
- **Shared Libraries**: Common enums and filters in `/libs/common` for code reusability
- **Path Aliases**: TypeScript path mapping (`@app/common`) for cleaner imports
- **Exception Handling**: Centralized exception filters for consistent error responses
- **Soft Delete**: Implemented soft delete for data integrity and audit trails
- **DTOs & Validation**: Request/response validation using class-validator and class-transformer

### Frontend Architecture
- **Context API**: Centralized authentication state management
- **Component Library**: Shadcn/ui components for consistent, accessible UI
- **Type Safety**: Strongly typed API client with Zod schema validation
- **Form Management**: React Hook Form for performant form handling
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Security
- **JWT Authentication**: Secure token-based authentication with Passport
- **Environment Variables**: Sensitive data stored in .env files
- **CORS Configuration**: Controlled cross-origin requests

### Testing
- **Unit Tests**: Service layer testing with Jest
- **Test Coverage**: Comprehensive test suite for business logic
- **Mock Repositories**: Isolated testing with repository mocks

## 🎯 Key Features Implemented

✅ User authentication (Register/Login)  
✅ JWT-based authorization  
✅ CRUD operations for todos  
✅ Todo status management (Pending, In Progress, Completed)  
✅ Soft delete functionality  
✅ RESTful API design  
✅ Swagger API documentation  
✅ Responsive UI with modern design  
✅ Form validation (client & server)  
✅ Error handling and user feedback  
✅ TypeScript throughout the stack  
✅ Docker containerization for database  

## 📝 Development Notes

This project demonstrates:
- Clean code principles and best practices
- Modern full-stack development with TypeScript
- RESTful API design patterns
- Database design and ORM usage
- Authentication and authorization implementation
- Component-based frontend architecture
- Testing strategies and implementation
- Professional project structure and organization


## Made by 
# Motammim Haque Rabib
# rabibhaque200@gmail.com