/* algunas personas no le colocan el .implementation. al archivo porque ya está dentro del infrastructure, pero en este caso lo haremos con ese nombre para que quede más explícito */

import { prisma } from "../../data/postgres";
import { TodoDatasource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/DTOs/todos";
import { TodoEntity } from "../../domain/entities/todo.entity";

/* toda esta implementación o todo este TodoDatasourceImplementation resume cómo queremos conectarnos a nuestra base de datos de Postgres y si por ejemplo se tiene a Mongo entonces aquí es donde se haría con Mongoose o si se tiene a Prisma entonces se puede conectar a Mongo usando Prisma */
export class TodoDatasourceImplementation implements TodoDatasource {
  async create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    const newTodo = await prisma.todoModel.create({
      data: createTodoDTO!, // aquí se coloca createTodoDTO! porque eso ya sabamos que tenemos el dato que necesitamos, y también ya se hizo la validación si había algún error arriba. Se puede regresar una instancia también en el create-todo.dto.ts para evitar colocar ese createTodoDTO! pero no sería conveniente porque se crearía una instancia incompleta porque precisamente habría un error, entonces por eso lo dejamos así como está ahora
    });

    /* hay que tener en cuenta que este create puede fallar y se puede lanzar una excepción porque supongamos que tenemso una regla que dice que todo lo que tiene el createTodoDTO está bien pero puede ser que venga un correo electrónico y ese correo tenga alguna validación, etc etc y eso lo controlaremos después y si lanza alguna excepción vamos a controlarla, pero por ahora lo mantendremos así que es un poco más simple */

    return TodoEntity.fromObject(newTodo);
  }

  async getAll(): Promise<TodoEntity[]> {
    /* este todos no es un objeto de mi entidad, por más que se vea igual y luzca igual NO es lo mismo, porque si se coloca de frente el return todos nos dará un error, entonces aquí tocaría hacer un mapeo, es decir, un mapper, es decir, tomar la información que se tiene en todos y transformarla en un TodoEntity y para eso se pueden hacer de varias formas, crear un archivo aparte o una clase aparte o sino simplemente modificar o crear métodos en el TodoEntity */
    const todos = await prisma.todoModel.findMany();

    return todos.map((todoElement) => TodoEntity.fromObject(todoElement));
  }

  async findById(id: number): Promise<TodoEntity> {
    const todoById = await prisma.todoModel.findFirst({
      where: { id: id },
    });

    /* aquí puede ser que se encuentre o no se encuentre y si no se encuentra entonces lanzaría un error */
    if (!todoById) throw `Todo with id ${id} not found!`;

    return TodoEntity.fromObject(todoById);
  }

  async updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    /* aquí se puede colocar directo el await this.findById(updateTodoDTO.id); porque no estamos utilizando la constante, pero en este caso se dejaré así para que esté explícito */
    const todoById = await this.findById(updateTodoDTO.id);

    const updatedTodo = await prisma.todoModel.update({
      where: { id: updateTodoDTO.id },
      data: updateTodoDTO!.values, // aquí se coloca updateTodoDTO!.values porque eso ya sabamos que tenemos el dato que necesitamos, y también ya se hizo la validación si había algún error arriba. Se puede regresar una instancia también en el update-todo.dto.ts para evitar colocar ese updateTodoDTO!.values pero no sería conveniente porque se crearía una instancia incompleta porque precisamente habría un error, entonces por eso lo dejamos así como está ahora
    });

    /* aquí se coloca con el TodoEntity.fromObject(updatedTodo) porque en realidad nos estamos comprometiendo a regresar un Promise<TodoEntity> que ya básicamente está en el todoById pero en el updatedTodo hubieron cambios, entonces por eso se coloca de esa forma porque puede ser que la base de datos haya hecho algún cambio y se quiere tomar ese último valor actualizado y no el todoById */
    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    /* aquí se puede colocar directo el await this.findById(updateTodoDTO.id); porque no estamos utilizando la constante, pero en este caso se dejaré así para que esté explícito */
    const todoById = await this.findById(id);

    const deletedTodo = await prisma.todoModel.delete({
      where: { id: id },
    });

    return TodoEntity.fromObject(deletedTodo);
  }
}
