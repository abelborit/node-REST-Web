import { TodoDatasource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/DTOs/todos";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { TodoRepository } from "../../domain/repositories/todo.repository";

/* aquí le podemos mandar cualquier datasource que sea de tipo TodoDatasource y tendría que trabajar todo normal */
export class TodoRepositoryImplementation implements TodoRepository {
  /* vamos a inyectar nuestro datasource */
  constructor(private readonly datasource: TodoDatasource) {}

  create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    return this.datasource.create(createTodoDTO);
  }

  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }

  findById(id: number): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }

  updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    return this.datasource.updateById(updateTodoDTO);
  }

  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }
}
