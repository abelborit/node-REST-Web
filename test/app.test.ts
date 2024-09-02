import { envs } from "../src/config/envs.plugin";
import { Server } from "../src/presentation/server";

jest.mock("../src/presentation/server"); // todo lo que esté en este path es un mock

/* este sería un test ya no de un método estático como en otros ejercicios como "node-NOC-app-monitoring-system", sino ya es la creación de una instancia */
/* aquí no se necesitaría testear que se cree el servidor, que el servidor llame al método start() porque eso se hará en el test del server.ts, sino que, como está en el código del app.ts, que este test mande a llamar a la función main con los métodos que estamos esperando, los cuales serían crear la instancia de la clase Server con los argumentos que necesita */
describe("Test in app.test.ts", () => {
  test("should call the server with arguments and start", async () => {
    await import("../src/app");

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      public_path: envs.PUBLIC_PATH,
      routes: expect.any(Function),
      // routes: AppRoutes.routes, // si se coloca de esta forma, hablando de código es lo mismo pero técnicamente no lo es, ya que en JavaScript al ser todo objetos, entonces esta función apunta a un espacio en memoria diferente y es por eso que no va a pasar el test como correcto, para eso se coloca que mientras que haya sido llamado con una función cualquiera entonces es suficiente
    });

    /* prototype para acceder al método start */
    expect(Server.prototype.start).toHaveBeenCalledWith();
  });
});
