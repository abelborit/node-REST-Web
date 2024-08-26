import { TodoEntity } from "../../entities/todo.entity";
import { CreateTodoDTO } from "../../DTOs/todos/create-todo.dto";
import { TodoRepository } from "../../repositories/todo.repository";

export interface CreateTodoUseCaseInterface {
  execute(createTodoDTO: CreateTodoDTO): Promise<TodoEntity>;
}

export class CreateTodoUseCase implements CreateTodoUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  execute(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    return this.repository.create(createTodoDTO);
  }
}
