import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetAllTodosUseCaseInterface {
  execute(): Promise<TodoEntity[]>;
}

export class GetAllTodosUseCase implements GetAllTodosUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  execute(): Promise<TodoEntity[]> {
    return this.repository.getAll();
  }
}
