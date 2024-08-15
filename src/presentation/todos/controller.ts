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
}
