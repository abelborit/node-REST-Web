import { Request, Response } from "express";

const todos = [
  { id: 1, text: "Todo 1", createdAt: new Date() },
  { id: 2, text: "Todo 2", createdAt: null },
  { id: 3, text: "Todo 3", createdAt: new Date() },
];

export class TodosController {
  /* aquí no tendrá métodos estáticos porque usualmente en nuestros controladores vamos a querer hacer las inyecciones de dependencias. Aquí podríamos inyectar un repositorio y que nuestras rutas usen ese repositorio para realizar el trabajo que nosotros queremos hacer o mejor aún, podemos inyectar un repositorio para poder implementar y usarlo mediante casos de uso */

  constructor() {}

  public getTodos = (request: Request, response: Response) => {
    /* este return es opcional aunque es bastante común que se retorne para que después ya no haga algún código adicional */
    todos
      ? response.status(200).json(todos)
      : response
          .status(404)
          .json({ messageError: `Todos list don't have any todos!` });
  };

  public getTodoById = (request: Request, response: Response) => {
    /* se le coloca el + para convertir el string que me da los parámetros de la url usando el request.params.id a un número para poder hacer la validación con el id que tiene mi lista de todos y tener el mismo tipo number y no string (de los parámetros) y number (de la lista de todos) */
    const idParam = +request.params.id; // si el id es valido como un 1, o 100 entonces está bien y sería status 200 pero si se coloca algo inválido como /12jsjs entonces tendría que ser un status 404
    // console.log({ idParam });
    if (isNaN(idParam))
      return response
        .status(400)
        .json({ messageError: "id param is not a number (NaN)" });

    const todoById = todos.find((todoElement) => todoElement.id === idParam);

    todoById
      ? response.status(200).json(todoById)
      : response
          .status(404)
          .json({ messageError: `Todo with id ${idParam} not found!` });
  };

  public createTodo = (request: Request, response: Response) => {
    // const body = request.body; // por si la data viene con exactamente lo que se solicita
    const { text } = request.body; // por si la data viene con propiedades de relleno y se extrae solo lo que se necesita

    /* se pueden colocar más validaciones por ejemplo si hay propiedades innecesarias entonces mandar un error pero ahorita se hará un backend flexible a que si mandan propiedades de relleno entonces solo tomará las propiedades que se necesita */
    if (!text)
      return response
        .status(400)
        .json({ messageError: "text property is required" });

    const newTodo = {
      /* colocarlo para que se sume + 1 no sería lo recomendado porque si dos usuarios crean al mismo tiempo entonces pueden haber inconsistencias en la base de datos */
      id: todos.length + 1,
      text,
      createdAt: null,
    };

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

    todos.push(newTodo);

    return response.status(200).json(newTodo);
  };
}
