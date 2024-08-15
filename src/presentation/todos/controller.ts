import { Request, Response } from "express";

export class TodosController {
  /* aquí no tendrá métodos estáticos porque usualmente en nuestros controladores vamos a querer hacer las inyecciones de dependencias. Aquí podríamos inyectar un repositorio y que nuestras rutas usen ese repositorio para realizar el trabajo que nosotros queremos hacer o mejor aún, podemos inyectar un repositorio para poder implementar y usarlo mediante casos de uso */

  constructor() {}

  public getTodos = (request: Request, response: Response) => {
    /* este return es opcional aunque es bastante común que se retorne para que después ya no haga algún código adicional */
    return response.json([
      { id: 1, text: "Todo 1", createdAt: new Date() },
      { id: 2, text: "Todo 2", createdAt: null },
      { id: 3, text: "Todo 3", createdAt: new Date() },
    ]);
  };
}
