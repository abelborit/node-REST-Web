import request from "supertest";
import { testServer } from "../../test.server";
import { prisma } from "../../../src/data/postgres";

/* Para hacer las pruebas de nuestro server, rutas, request, response, etc, usaremos supertest (https://www.npmjs.com/package/supertest) que ya lo instalamos con Jest para las pruebas pero nos podemos guiar de su documentación para conocer un poco más de cómo se podrían hacer los test en un rest full api endpoint. */
describe("Test in routes.ts", () => {
  /* levantar el servidor antes de todas las pruebas para poder empezar a hacer el test con los middlewares, rutas, etc porque si no entonces no tenemos el servidor levantado y los test nos darán un 404 Not Found porque obviamente no hay un servidor levantado y corriendo */
  beforeAll(async () => {
    await testServer.start();
  });

  /* nos aparecerá en la terminal un mensaje o un warning también similar a "A worker process has filed to exit gracefully and has been forced exited. This is likely caused by test leaking .........." lo cual quiere decir que hay una tarea asíncrona que no se terminó la cual es nuestro servidor de express que obviamente no se cancela pero cuando se termina el testing, el servidor de express se cierra de manera forzada lo cual se puede hacer de esa forma pero para hacerlo de una mejor forma, entonces crearemos y llamaremos al método close y con eso debería de terminar el proceso de nuestro servidor de express lo cual hará que ya no aparezca el warning de que algún proceso no se cerró */
  afterAll(() => {
    testServer.close();
  });

  beforeEach(async () => {
    await prisma.todoModel.deleteMany();
  });

  const todo1 = { text: "Hola Mundo 1" };
  const todo2 = { text: "Hola Mundo 2" };

  test("should return all todos - /api/todos", async () => {
    await prisma.todoModel.createMany({
      data: [todo1, todo2],
    });

    /* en el await request(.......) nos pide la aplicación, sería la instancia de nuestro server, sería esa inicialización de express de "private app = express();" y para eso crearemos un servidor de testing el cual será el test-server.ts, también se puede como exportar de alguna forma lo que está en el app.ts */
    /* Al hacerlo de esta forma entonces vamos a hacer las pruebas en nuestro servidor que está corriendo en testServer.app */
    /* si quitamos el async/await y colocamos por ejemplo un 400 en vez del 200, no nos da error en el test, y si colocamos el async/await y colocamos por ejemplo un 400 entonces sí nos da el error del test. Esto sucede porque es asíncrono, entonces en el momento que se hace el request la petición se va a trabajar pero primero finaliza el código síncrono, es decir, sin el async/await se corre la prueba, finaliza y luego recién tenemos la respuesta al código asíncrono pero ya se cerró el test, y si colocamos el async/await entonces espera a que se finalice esa parte del código y recién finaliza el test */
    /* pero luego de eso también tenemos otro problema, si lo colocamos así directo igual nos dará un error 404 Not Found, y eso es porque el servidor que tenemos de testServer.app no se ha levantado en ningún momento, no se está escuchando a ningún puerto, no está haciendo nada, el servidor solo se definió pero aún no se levantó. Entonces para levantarlo tenemos que mandar a llamar a su método .start() que establece los middleware respectivos, rutas, etc, y eso se hará en el beforeAll */
    /* ahora nos dará otro error, como un 400 o 404, según cómo lo hayamos configurado, en este caso será un 404 y eso nos puede dar un falso error, porque se puede pensar que es por frontend que se está enviando algo mal cuando en realidad es un error del servidor, entonces quitaremos el .expect(200); y colocaremos el console.log(response.body); y veremos que nos dará un error un poco más entendible como "{ error: { name: 'PrismaClientInitializationError', clientVersion: '5.18.0' } }" y eso viene por el lado de Prisma, aunque en realidad nos daría un poco más de texto como el "meta: { table: ....... }" que es donde estaría la tabla, y entonces tenemos que deducir que la base de datos no está preparada ni creada, entonces primero necesitamos crear la tabla antes de poder hacer el test, también tenemos que configurar Prisma para usar múltiples .env (https://www.prisma.io/docs/orm/more/development-environment/environment-variables/using-multiple-env-files) y ahí nos recomiendan instalar https://www.npmjs.com/package/dotenv-cli pero se puede instalar solo en este proyecto con `npm i -D dotenv-cli` y hacer un nuevo script `"prisma:migrate:test": "dotenv -e .env.test -- npx prisma migrate deploy",` y ya luego levantar el test y ahora podemos ver que el response.body vendrá con un arreglo vacío y ¿Por qué? porque en la base de datos no tenemos data todavía y por eso un []. Ahora sí podemos usar el .expect(200) y todo debería estar normal pero veremos un warning que se soluciona en el afterAll y agregando el método close en server.ts */
    const response = await request(testServer.app)
      .get("/api/todos")
      .expect(200);

    // const response = await request(testServer.app).get("/api/todos");

    // console.log(response.body);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(2);
    expect(response.body[0].text).toBe(todo1.text);
    expect(response.body[1].text).toBe(todo2.text);
    expect(response.body[0].createdAt).toBeNull();
  });

  test("should return a TODO - /api/todos/:id", async () => {
    /* para crear un todo usando la instancia de prisma directamente para tener un registro ya que en el beforeEach todo es borrado */
    const todo = await prisma.todoModel.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
      createdAt: todo.createdAt,
    });
  });

  test("should return a 404 Not Found - /api/todos/:id", async () => {
    const todoId = 999;
    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(404);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found!` });
  });

  test("should return a new Todo - /api/todos/createTodo", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos/createTodo")
      .send(todo1)
      .expect(201); // usualmente cuando se crea un recurso es status 201

    /* veremos que el id cambia bastante pero eso está bien, porque las demás pruebas también impactan la base de datos, es por eso que el id se va incrementando */
    // console.log(body);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      createdAt: null,
    });
  });

  test("should return an error if text property is not present - /api/todos/createTodo", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos/createTodo")
      .send({})
      .expect(400);

    expect(body).toEqual({ error: "Text property is required" });
  });

  test("should return an error if text property is empty - /api/todos/createTodo", async () => {
    const { body } = await request(testServer.app)
      .post("/api/todos")
      .send({ text: "" })
      .expect(400);

    expect(body).toEqual({ error: "Text property is required" });
  });

  test("should return an updated TODO - /api/todos/:id", async () => {
    /* para crear un todo usando la instancia de prisma directamente para tener un registro ya que en el beforeEach todo es borrado */
    const todo = await prisma.todoModel.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ text: "Hola mundo UPDATE", createdAt: "2023-10-21" })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: "Hola mundo UPDATE",
      createdAt: "2023-10-21T00:00:00.000Z",
    });
  });

  test("should return 404 if TODO not found", async () => {
    const todoId = 999;
    const { body } = await request(testServer.app)
      .put(`/api/todos/${todoId}`)
      .send({ text: "Hola mundo UPDATE", createdAt: "2023-10-21" })
      .expect(404);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });

  test("should return an updated TODO but only update the date", async () => {
    /* para crear un todo usando la instancia de prisma directamente para tener un registro ya que en el beforeEach todo es borrado */
    const todo = await prisma.todoModel.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({ createdAt: "2023-10-21" })
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      createdAt: "2023-10-21T00:00:00.000Z",
    });
  });

  test("should delete a TODO - /api/todos/:id", async () => {
    const todo = await prisma.todoModel.create({ data: todo1 });

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todo.id}`)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo.text,
      createdAt: null,
    });
  });

  test("should return 404 if todo does not exist - /api/todos/:id", async () => {
    const todoId = 999;
    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todoId}`)
      .expect(404);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });
});
