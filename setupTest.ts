/* este archivo de setupTest.ts es un script o una serie de procesos que se van a ejecutar antes de levantar la aplicación */

import { config } from "dotenv";

/* config para poder configurar las variables de entorno ya que sin estas configuración al momento de querer leer las variables de entorno estará leyendo las del .env y no las que colocaríamos para el test que estárían en .env.test */
config({

})

/* con lo anterior ya realizado, entonces hay que decirle a Jest que cuando se levante entonces tiene que ejecutar este archivo primero y eso lo hacemos en el archivo jest.config.ts y sería colocar esta configuración en el setupFiles:

  setupFiles: [
    "<rootDir>/setupTest.ts"
  ],
*/