/* Los casos de uso son un lugar ideal para implementar lógica que se relaciona directamente con la funcionalidad que se está desarrollando. Por ejemplo "si se quiere crear un todo y que al crear nos envie un correo y que luego haga otras cosas X", es decir, si se desea enviar un correo electrónico después de crear un "todo", es perfectamente razonable que esa lógica se encuentre dentro del caso de uso correspondiente */

/* con los casos de uso se puede separar la lógica de la aplicacion de la lógica de negocio, entonces para apps con lógica de negocio compleja, los casos de uso son muy buenos. Dicho esto, su uso depende de la envergadura, complejidad y alcance del proyecto, por ejemplo para proyectos pequeños no sería necesario complicarnos usando los casos de uso ya que con el patrón repositorio, el cual está en controller.ddd.ts, sería más que suficiente o sino también se puede crear un servicio que llame al repositorio y luego llamar al servicio desde el controlador */

export { CreateTodoUseCase } from "./create-todo";
export { DeleteTodoUseCase } from "./delete-todo";
export { GetAllTodosUseCase } from "./get-all-todos";
export { GetTodoByIdUseCase } from "./get-todo-by-id";
export { UpdateTodoUseCase } from "./update-todo";
