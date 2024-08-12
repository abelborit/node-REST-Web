/* todo lo que va de express usualmente se coloca en la carpeta de presentation para no afectar la lógica de negocio. Aquí se podría decir que es una dependencia oculta pero en realidad se va a utilizar express en muy pocos archivos y por eso se puede colocar normal en los archivos donde haga falta */
import express from "express";

export class Server {
  /* inicializar express */
  private app = express();

  async start() {
    /* Los Middelwares son funciones que se van a ejecutar en todo momento que se pase por una ruta. Los Middlewares son softwares que se sitúan entre un sistema operativo y las aplicaciones que se ejecutan en él. Básicamente, funcionan como una capa de traducción oculta para permitir la comunicación y la administración de datos en aplicaciones distribuidas las cuales estas son una aplicación con distintos componentes que se ejecutan en entornos separados, normalmente en diferentes plataformas conectadas a través de una red. */

    /* servir el Public folder */
    this.app.use(express.static("public"));

    /* colocar a nuestra aplicación a escuchar peticiones. El puerto debe venir por variables de entorno */
    this.app.listen(3000, () => {
      console.log(`server running on port ${3000} ✅`);
    });
  }
}
