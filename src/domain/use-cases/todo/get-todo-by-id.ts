import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface GetTodoByIdUseCaseInterface {
  execute(id: number): Promise<TodoEntity>;
}

export class GetTodoByIdUseCase implements GetTodoByIdUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.findById(id);
  }
}
