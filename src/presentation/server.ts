/* todo lo que va de express usualmente se coloca en la carpeta de presentation para no afectar la lógica de negocio. Aquí se podría decir que es una dependencia oculta pero en realidad se va a utilizar express en muy pocos archivos y por eso se puede colocar normal en los archivos donde haga falta */
import express, { Router } from "express";
import path from "path"; // este "path" ya viene nativo en node para trabajar con rutas de archivos y directorios. Aquí se utiliza para generar rutas absolutas

interface ServerOptions {
  port: number;
  public_path: string;
  routes: Router;
}

export class Server {
  /* inicializar express */
  private app = express();

  /* FORMA 1 */
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(serverOptions: ServerOptions) {
    const { port, public_path = "public", routes } = serverOptions;

    /* la propiedades readonly solo se pueden modificar en el constructor, ya después no se puede */
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  /* FORMA 2 */
  // constructor(
  //   private readonly port: number,
  //   private readonly publicPath: string
  // ) {}

  async start() {
    /* Middelwares */
    /* Los Middelwares son funciones que se van a ejecutar en todo momento que se pase por una ruta. Los Middlewares son softwares que se sitúan entre un sistema operativo y las aplicaciones que se ejecutan en él. Básicamente, funcionan como una capa de traducción oculta para permitir la comunicación y la administración de datos en aplicaciones distribuidas las cuales estas son una aplicación con distintos componentes que se ejecutan en entornos separados, normalmente en diferentes plataformas conectadas a través de una red. */

    /* Public Folder */
    /* aquí se configura un middleware para servir archivos estáticos desde la carpeta public. Esto significa que cualquier archivo dentro de public puede ser accedido directamente desde el navegador */
    this.app.use(express.static(this.publicPath));

    /* Routes de las API */
    this.app.use(this.routes);

    /* Servir las demás rutas por ejemplo de una SPA (Single Page Application) */
    /* para aplicaciones que tienen diferentes rutas usando get("*", ......) el asterísco significa cualquier otra petición get que se esté haciendo, aparte ya de la carpeta public anterior. Es como que si está en la carpeta public entonces que lo sirva (porque ahí ya entra react y toma la aplicación y hace todo desde el lado del cliente) y si no está en la carpeta public (serían las demás rutas que no sean el index o root de la aplicación) se pasaría a este get("*", ......) y esto nos sirve como comodín y vamos a interceptar todas las request y vamos a emitir una response */
    /* Esta ruta es un comodín (*), lo que significa que intercepta todas las peticiones GET que no coincidan con ningún otro archivo estático en public. En este caso, se responde con el archivo index.html, que probablemente sea la entrada principal de una aplicación frontend (como React). El path.join se usa para asegurar que la ruta al archivo sea absoluta, lo cual es necesario para que Node.js lo encuentre correctamente */
    this.app.get("*", (request, response) => {
      // console.log(__dirname); // es una variable global en Node.js que contiene la ruta absoluta del directorio donde se encuentra el archivo que se está ejecutando actualmente
      // console.log("../../../public/index.html"); // es un camino relativo que sube tres directorios hacia arriba y luego entra en la carpeta public para acceder al archivo index.html

      /* retornar el path a nuestro index de nuestra carpeta public, pero tiene que ser un path absoluto. Esto asegura que la ruta final sea absoluta, lo cual es necesario para que Node.js pueda encontrar el archivo sin ambigüedades ya que sin eso al entrar a la aplicación y recargar cualquier ruta nos aparecerá que no puede servir la aplicación porque no encontró la ruta, porque precisamente no tenemos en la carpeta public alguna carpeta con esa ruta */
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      // console.log(indexPath); // la ruta absoluta de la ubicación del archivo index.html

      /* este método envía el archivo especificado (en este caso, index.html) como respuesta al cliente que hizo la solicitud. El index.html es el archivo principal de una aplicación web que generalmente contiene la estructura base de la interfaz de usuario. En una SPA, este archivo carga todo el contenido dinámico necesario mediante JavaScript (por ejemplo, React o Vue.js) */
      /* En una aplicación SPA, el enrutamiento del lado del cliente se maneja en el navegador mediante JavaScript. El servidor, en este caso, debe devolver siempre index.html, independientemente de la ruta solicitada, para que la aplicación del lado del cliente pueda tomar el control y renderizar la vista correcta. Esta ruta comodín asegura que cualquier ruta no capturada por archivos estáticos (como imágenes, hojas de estilo, etc.) sea manejada por index.html, lo que permite que el enrutamiento del lado del cliente funcione correctamente */
      response.sendFile(indexPath);

      return;
    });

    /* colocar a nuestra aplicación a escuchar peticiones. El puerto debe venir por variables de entorno */
    this.app.listen(this.port, () => {
      console.log(`server running on port ${this.port} ✅`);
    });
  }
}
