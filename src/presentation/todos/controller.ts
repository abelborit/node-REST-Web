import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

// let todos = [
//   { id: 1, text: "Todo 1", createdAt: new Date() },
//   { id: 2, text: "Todo 2", createdAt: null },
//   { id: 3, text: "Todo 3", createdAt: new Date() },
// ];

export class TodosController {
  /* aquí no tendrá métodos estáticos porque usualmente en nuestros controladores vamos a querer hacer las inyecciones de dependencias. Aquí podríamos inyectar un repositorio y que nuestras rutas usen ese repositorio para realizar el trabajo que nosotros queremos hacer o mejor aún, podemos inyectar un repositorio para poder implementar y usarlo mediante casos de uso */

  constructor() {}

  public getTodos = async (request: Request, response: Response) => {
    const todos = await prisma.todoModel.findMany();

    /* este return es opcional aunque es bastante común que se retorne para que después ya no haga algún código adicional */
    todos
      ? response.status(200).json(todos)
      : response
          .status(404)
          .json({ messageError: `Todos list don't have any todos!` });
  };

  public getTodoById = async (request: Request, response: Response) => {
    /* se le coloca el + para convertir el string que me da los parámetros de la url usando el request.params.id a un número para poder hacer la validación con el id que tiene mi lista de todos y tener el mismo tipo number y no string (de los parámetros) y number (de la lista de todos) */
    const idParam = +request.params.id; // si el id es valido como un 1, o 100 entonces está bien y sería status 200 pero si se coloca algo inválido como /12jsjs entonces tendría que ser un status 404
    // console.log({ idParam });
    if (isNaN(idParam))
      return response
        .status(400)
        .json({ messageError: "id param is not a number (NaN)" });

    const todoById = await prisma.todoModel.findFirst({
      where: { id: idParam },
    });

    // const todoById = todos.find((todoElement) => todoElement.id === idParam);

    todoById
      ? response.status(200).json(todoById)
      : response
          .status(404)
          .json({ messageError: `Todo with id ${idParam} not found!` });
  };

  public createTodo = async (request: Request, response: Response) => {
    // const body = request.body; // por si la data viene con exactamente lo que se solicita
    const { text } = request.body; // por si la data viene con propiedades de relleno y se extrae solo lo que se necesita

    /* se pueden colocar más validaciones por ejemplo si hay propiedades innecesarias entonces mandar un error pero ahorita se hará un backend flexible a que si mandan propiedades de relleno entonces solo tomará las propiedades que se necesita */
    if (!text)
      return response
        .status(400)
        .json({ messageError: "text property is required" });

    const newTodo = await prisma.todoModel.create({
      data: {
        text: text,
      },
    });

    // const newTodo = {
    //   /* colocarlo para que se sume + 1 no sería lo recomendado porque si dos usuarios crean al mismo tiempo entonces pueden haber inconsistencias en la base de datos */
    //   id: todos.length + 1,
    //   text,
    //   createdAt: null,
    // };

    /* ejemplos de body para colocar en el postman */
    /* DATA CORRECTA */
    // {
    //   "text": "Todo created"
    // }

    /* DATA CORRECTA PERO CON RELLENO */
    // {
    //   "text": "Todo created",
    //   "propertie": "Propertie",
    //   "propertie2": "Propertie 2"
    // }

    // todos.push(newTodo);

    return response.status(200).json(newTodo);
  };

  public updateTodo = async (request: Request, response: Response) => {
    /* se le coloca el + para convertir el string que me da los parámetros de la url usando el request.params.id a un número para poder hacer la validación con el id que tiene mi lista de todos y tener el mismo tipo number y no string (de los parámetros) y number (de la lista de todos) */
    const idParam = +request.params.id; // si el id es valido como un 1, o 100 entonces está bien y sería status 200 pero si se coloca algo inválido como /12jsjs entonces tendría que ser un status 404
    // console.log({ idParam });
    if (isNaN(idParam))
      return response
        .status(400)
        .json({ messageError: "id param is not a number (NaN)" });

    const todoById = await prisma.todoModel.findFirst({
      where: { id: idParam },
    });

    // const todoById = todos.find((todoElement) => todoElement.id === idParam);

    if (!todoById)
      return response
        .status(404)
        .json({ messageError: `Todo with id ${idParam} not found` });

    const { text, createdAt } = request.body;

    /* ejemplos de body para colocar en el postman */
    // {
    //   "text": "Todo updated"
    // }

    // {
    //   "text": "Todo updated",
    //   "createdAt": "null"
    // }

    // {
    //   "text": "Todo updated",
    //   "createdAt": null
    // }

    // {
    //   "text": "Todo updated",
    //   "createdAt": "2023-10-21"
    // }

    const updatedTodo = await prisma.todoModel.update({
      where: { id: idParam },
      data: {
        text: text,
        createdAt: createdAt ? new Date(createdAt) : null, // aquí todavía se tendrían que hacer validaciones si es un formato fecha y demás, pero por ahora solo se dejará simple y luego usaremos lo que se conoce como DTO (Data Transfer Objects)
      },
    });

    /* aquí se estaría actualizando el todo pero por referencia, porque se tiene la misma referencia del objeto, es decir, el mismo espacio en memoria, solo que se está cambiando una propiedad. Esta forma no sería la más adecuada, no se debería mutar la data directamente y eso en base de datos se hará más facil ver el problema, ahora como está en memoria y vuelve todo a la normalidad cuando se termina y se levanta el servicio entonces no hay problema */
    // todoById.text = text || todoById.text; // si viene el texto entonces se actualiza y si no entonces que mantenga su texto
    // createdAt === "null" || createdAt === null // si viene null en el body......
    //   ? (todoById.createdAt = null) // entonces colocar el valor de null que sería como borrar la fecha
    //   : (todoById.createdAt = new Date(createdAt || todoById.createdAt)); // si no, entonces mandar una fecha la cual sería si viene fecha en el body entonces colocarla y si no entonces colocar la fecha que ya tenía inicialmente

    /* la información que estamos regresando en updatedTodo luce muy similar a lo que nosotros estamos guardando en base de datos pero aquí deberíamos regresar la instancia personalizada de nuestra clase que es usada para controlar nuestro endpoint, por así decirlo, no debería ser algo que viene de Prisma, pero esas migraciones ya lo haremos cuando se aplique la Clean Architecture */
    return response.status(200).json(updatedTodo);
  };

  /* para el delete no necesariamente se tendría que eliminar de la base de datos, se puede simplemente colocarlo como inactivo y dejarlo en la base de datos pero que ya no pueda ser solicitado y que se conserve para poder mantener un historial o algo similar */
  public deleteTodo = async (request: Request, response: Response) => {
    /* se le coloca el + para convertir el string que me da los parámetros de la url usando el request.params.id a un número para poder hacer la validación con el id que tiene mi lista de todos y tener el mismo tipo number y no string (de los parámetros) y number (de la lista de todos) */
    const idParam = +request.params.id; // si el id es valido como un 1, o 100 entonces está bien y sería status 200 pero si se coloca algo inválido como /12jsjs entonces tendría que ser un status 404
    // console.log({ idParam });
    if (isNaN(idParam))
      return response
        .status(400)
        .json({ messageError: "id param is not a number (NaN)" });

    const todoById = await prisma.todoModel.findFirst({
      where: { id: idParam },
    });

    /* si el todo que estamos buscando no se encuentra en la base de datos */
    if (!todoById)
      return response.status(404).json({
        messageError: `Todo with id ${idParam} not found in our database`,
      });

    const deletedTodo = await prisma.todoModel.delete({
      where: { id: idParam },
    });

    /* si por alguna razón la operación de eliminación falla, aunque el todo exista, puede haber un problema con la base de datos o algún otro error inesperado, por eso se valida dos veces, es una buena práctica manejar los errores de esta manera para asegurarnos de que todo funcione correctamente y siempre mandarle una respuesta al usuario */
    deletedTodo
      ? response.status(200).json(deletedTodo)
      : response
          .status(403) // 400 - 403 - 404 - 500 u otro código de error
          .json({
            messageError: `We have some problems to delete todo with id ${idParam}`,
          });

    // /* se puede usar filter cuando son pocos elementos ya que este lee todo el arreglo y si son bastantes elementos puede afectar el rendimiento */
    // /* findIndex encuentra el índice del primer elemento que coincide con la condición. Se usa en un arreglo con bastantes elementos para mejorar el rendimiento. Si existe retornar el índice y si no existe retorna un -1 */
    // const todoIndexById = todos.findIndex(
    //   (todoElement) => todoElement.id === idParam
    // );
    // // console.log(todoIndexById);

    // const todoToDelete = todos[todoIndexById];

    // if (todoIndexById === -1)
    //   return response
    // .status(404)
    // .json({ messageError: `Todo with id ${idParam} not found` });

    // /* slice no muta el arreglo original y se puede trabajar de forma directa ya que retorna un nuevo arreglo */
    // /* slice(inicio índice, fin índice) */
    // todos = [
    //   ...todos.slice(0, todoIndexById),
    //   ...todos.slice(todoIndexById + 1),
    // ];

    // return response.status(200).json({ todoById, deletedTodo });
  };
}
