import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";
import { UpdateTodoDTO } from "../../DTOs/todos/update-todo.dto";

export interface UpdateTodoUseCaseInterface {
  execute(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity>;
}

export class UpdateTodoUseCase implements UpdateTodoUseCaseInterface {
  constructor(private readonly repository: TodoRepository) {}

  execute(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    return this.repository.updateById(updateTodoDTO);
  }
}
