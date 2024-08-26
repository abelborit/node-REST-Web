import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface DeleteTodoUseCaseInterface {
  execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodoUseCase implements DeleteTodoUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.deleteById(id);
  }
}
