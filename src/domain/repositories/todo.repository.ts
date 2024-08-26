/* recordar que lo que está en domain son reglas, son las reglas que se van a imponer sobre todo lo demás, es lo más importante de la aplicación, están los datasources (orígenes de datos), repositories (métodos para poder llegar a los datasources), entities, DTOs, use cases, etc */

import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDTO } from "../DTOs/todos/create-todo.dto";
import { UpdateTodoDTO } from "../DTOs/todos/update-todo.dto";

/* este TodoRepository vendría a ser igual o muy similar al TodoDatasource porque en este TodoRepository vamos a tener los métodos que vamos a necesitar para llegar al datasource que sería el TodoDatasource */
export abstract class TodoRepository {
  /* para crearnos un TodoEntity, en este caso ya se coloca el DTO porque ya sabemos qué información va a venir, qué se necesita para crealo y si la información crece o se modifica solo se modifica el DTO y nada más. En secciones anteriores como en la app "node-NOC-app-monitoring-system" al momento de colocar el "create" se pedía la instancia de la entidad algo similar a "abstract create(newTodo: TodoEntity):Promise<TodoEntity>" para pedir la instancia de nuestro TodoEntity o como en el caso de la aplicación anterior "abstract saveLog(newLog: LogEntity): Promise<void>;" lo cual no tiene mucho sentido porque si se quiere crear una instancia entonces por qué tiene que regresar una instancia ya creada, no tiene mucho sentido pero ahora como ya vimos el concepto de los DTO entonces ese es el objeto que se tiene que pasar al "create" para poder tener toda la información que necesito */
  abstract create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity>;
  abstract getAll(/* no se pedirá ningún argumento todavía pero se hará como una paginación */): Promise<
    TodoEntity[]
  >;
  /* por ejemplo en este caso, que es pasar un id, podemos suponer que puede fallar, entonces lo que se retorna puede ser una promesa que trabaja un TodoEntity o un undefined es decir, : Promise<TodoEntity | undefined> pero en este caso lo colocaremos simple */
  abstract findById(id: number): Promise<TodoEntity>;
  abstract updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity>;
  abstract deleteById(id: number): Promise<TodoEntity>;
}
