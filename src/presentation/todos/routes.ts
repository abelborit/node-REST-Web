import { Router } from "express";
import { TodosController } from "./controller";

export class TodosRoutes {
  /* aquí se utiliza static functions porque como no se hará inyección de dependencias entonces no sería necesario instsanciar la clase AppRoutes y solo se coloca directo. También se están usando el get function para tener otra forma de realizar esta función, se podría realizar sin ese get (son solo diferentes formas de hacerlo) */
  static get routes(): Router {
    const router = Router();
    const todosController = new TodosController();

    /* Routes de las API de los todos */
    /* FORMA 1: aquí solo se está mandando la referencia a la función porque lo que se manda y lo que se recibe es el mismo orden y lo mismo */
    router.get("/", todosController.getTodos);
    // router.get("/firstTodo", todosController.getFirstTodo); // ejemplo de lo que podría crearse a futuro para usar en este archivo de routes

    /* FORMA 2: aquí se está mandando la función con sus parámetros que es una segunda forma de hacerlo en vez de la de arriba  */
    // router.get("/", (request, response) =>
    //   todosController.getTodos(request, response)
    // );

    return router;
  }
}
