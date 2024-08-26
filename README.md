# NODE & TypeScript - REST Web

---

## Parte I:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

Esta sección tiene por objetivo aprender un poco sobre HTTP, Http2, Https y montar un WebServer con una aplicación corriendo en la web.

Un WebServer es un servidor donde podemos colocar archivos que van a ser servidos mediante protocolo HTTP, Http2 o Https. Veremos cómo configurarlos, usarlos, desplegarlos en un hosting para poder consumirlo desde cualquier parte del mundo, etc. Esta sección tiene por objetivo entender cómo funcionan las respuestas, qué es una request, qué viene en la request, ver qué información es solicitada y cómo la regresamos. También lo haremos con Http2 y luego usaremos express (framework de node) para conocer cómo nos puede simplificar el crear nuestros webserver y nuestros restfull API endpoint.

En la Parte II haremos una extensión de este proyecto de Web Server para que también se vuelva un RestFull API Server o que nuestro Application Programming Interface tenga su API para que peticiones externas puedan llegar a nuestro servidor y luego nuestro servidor manejarlas.

- Puntualmente veremos:

  - Crear un WebServer
    - De forma Manual
    - Usando express
  - Patrón de Arquitectura Limpia (para poder separar responsabilidades)
  - Variables de entorno
  - Single Page Application + Router de Frontend
  - Servir diferentes archivos
  - Desplegar servidor en la nube
  - GitHub
  - Railway

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `express` usando `npm install express --save` desde `https://expressjs.com/`
  - Sus types `npm i --save-dev @types/express`
- Paquete `dotenv` usando `npm i dotenv` desde `https://www.npmjs.com/package/dotenv` para leer las variables de entorno
- Paquete `env-var` usando `npm i env-var` desde `https://www.npmjs.com/package/env-var` para hacer validaciones de nuestras variables o qué tipo de dato van a regresar (string, number, etc)

### \* NOTAS:

- Generar el SSL para Linux y MAC: `openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt`. Si hay problemas se puede intentar lo siguiente:

  ```
    Para quienes tengan el mismo error tienen que buscar la ubicación de su oppenssl.cfn y establecerlo en las variables de entorno siendo el nombre OPENSSL_CONF y el valor de la variable **ruta...**openssl.cnf, por ejemplo para mi la ruta es -> C:\Program Files\Git\mingw64\ssl
  ```

- Generar el SSL para Windows si el openssl existe (porque al instalar git y gitbash ya debería de reconocer) probando en una terminal `openssl`: `openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt`. Si hay problemas se puede hacer lo siguiente:

- Generar el SSL para Windows si el openssl no existe (porque al instalar git y gitbash ya debería de reconocer) probando en una terminal `openssl` y si no entonces hay que configurar las variables y tener el path del openssl:

  - Tener el path del openssl: disco C -> programs file -> Git -> usr -> bin -> archivo openssl -> copiar path hasta ese archivo o ubicación

  - Modificar las variables de nuestra computadora: tecla windows -> buscar env (Edit the system environments variables) -> Opción de Environments Variables... -> Path -> Edit -> Colocar el path sacado anteriormente -> ok -> ok

- Un comentario de un alummno:

  ```
    Para aquellos con windows y tengan problema al generar el certificado:
    --------------------------------------------------------------------------

    En mi caso particular, con windows 10, me estaba dando error pese a configurar la variable de entorno en el path.
    Me estaba dando un error que no encontraba el archivo openssl.cnf en la carpeta donde tenia instalado Postgres (o sea, nada que ver), por algún motivo me estaba tomando dicha ruta, entonces a la linea que pasa fernando " openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt " al final agreguenle el path donde esta el archivo de openssl.cnf , en mi caso estaba en: git\usr\ssl, quedando la sentencia asi:
    openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt -config "C:\Program Files\Git\usr\ssl"

    Con eso ya estaria, pero tambien en mi caso particular al correrlo indistintamente desde git o powerShell me daba un error de lectura por permisos.
    Por lo tanto con la ayuda de chatGPT la solución fue crear un archivo de configuracion .cnf personalizado en el path donde tengas la carpeta usr\ssl,  para  generar el archivo nuevo abris el archivo openssl.cnf copias el contenido y lo guardas en un nuevo archivo (en mi caso lo llame myConfig.cnf) y luego lo mismo:  openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt -config "C:\Program Files\Git\usr\ssl\myConfig.cnf" .

    Luego tuve otro error más en donde no podia encontrar algunas secciones para generar el certificado ( como por ejemplo countryName) , por lo tanto, al archivo myConfig.cnf le agregue esta seccion tal cual me lo brindo chatGPT :

    [ req_distinguished_name ]

    countryName                     = Country Name (2 letter code)

    stateOrProvinceName             = State or Province Name (full name)

    localityName                    = Locality Name (eg, city)

    organizationName                = Organization Name (eg, company)

    commonName                      = Common Name (eg, your name)

    emailAddress                    = Email Address

    Por ultimo, para encontrar los archivos server.key y server.crt en mi caso se encontraban en el path por default que me brindaba powershell ( es decir, el path por defecto cuando abris powershell en la ruta donde se encuentra ) C:\Users\miUsuario
  ```

- Los Middlewares son funciones que se van a ejecutar en todo momento que se pase por una ruta. Los Middlewares son softwares que se sitúan entre un sistema operativo y las aplicaciones que se ejecutan en él. Básicamente, funcionan como una capa de traducción oculta para permitir la comunicación y la administración de datos en aplicaciones distribuidas las cuales estas son una aplicación con distintos componentes que se ejecutan en entornos separados, normalmente en diferentes plataformas conectadas a través de una red.

---

## Parte II:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección, nos enfocaremos en trabajar con un servidor rest y crear nuestra API. La idea es dejar las bases de todo el servidor bien organizado, para después conectar una base de datos en la siguiente sección e implementar la arquitectura a su totalidad.

Aquí vamos a extender nuestro Web Server y transformarlo a un Rest Server. Una de las particularidades de las peticiones rest en un API tradicional es que no tenga estado, sería sin estado por así decirlo, por ejemplo, no se conoce si el endpoint es llamado desde una aplicación movil o una aplicación web o de otro servidor, no se sabe de dónde viene esa petición, aunque técnicamente sí se podría si se colocan tokens de autenticación, pero la sesión es pasiva, es decir, se pueden tener un millón de usuarios todos conectados a la aplicación pero hasta que uno haga una solicitud ahí recién se emite su respuesta. Con eso se puede tener un alto volumen de usuarios pero la sesión es pasiva a diferencia de tener una sesión activa en el servidor haciendo otras configuraciones, pero el fuerte de los restfull api es que es una autenticación pasiva, es decir, cualquier persona puede mandar una petición al servidor y este, en el momento en que se hace la solicitud, recién le response.

- Puntualmente veremos:

  - CRUD
    - Create
    - Read
    - Updtate
    - Delete
  - Desplegar Restful server a la web
  - Configurar las rutas y los controladores

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- HTTP response status codes -> https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
- ejemplo
- ejemplo

---

## Parte III:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

Nos enfocaremos en tener nuestro TODO API y grabarlo en base de datos, vamos a usar Prisma para hacer las migraciones, hacer la grabación ahí y todavía no aplicaremos Clean Architecture y lo haremos directamente en los controladores, que es como comúnmente lo veremos en un entorno de la vida real, donde no se aplica alguna arquitectura sino solo separarlo bajo responsabilidades hasta el controlador. Pero más adelante llegaremos a un punto donde vamos a separar nuestras bases de datos, nuestros casos de uso, nuestros repositorios y todo de tal manera para poder cambiar a futuro la base de datos sin ningún problema.

Es una sección donde aprenderemos de forma tradicional, como realizar las interacciones con la base de datos, pero sin aplicar arquitectura limpia, lo haremos de forma ordenada pero sencilla, que es como comúnmente lo veremos en un entorno de la vida real, y luego en la siguiente sección aplicaremos la arquitectura en su totalidad.

También veremos un concepto nuevo que no tiene nada que ver con NODE, que es una forma de desarrollar y es un patrón de desarrollo donde vamos a tener los famosos DTOs (Data Transfer Objects) los cuales son un objeto que sirve para trasladarlo a otro lugar, es decir, tenemos un objeto con cierta data y para trasladarlo a otro lugar, tenemos que transformarlo a algo que se está esperando recibir para usarlo. Esto ayudará a hacer validaciones, transformaciones de datos y en general nos va a servir para poder hacer las inserciones que se necesitan después según nuestro requerimiento. Los DTOs se aplican en cualquier lenguaje de programación orientado a objetos así que será común verlo en varios proyectos.

Veremos cómo cargar información semilla, porque cuando se está empezando un nuevo proyecto o se carga un nuevo proyecto, sería bueno tener una base de datos previamente cargada, que se conoce como "seed", y es bastante útil cuando estamos creando una base de datos como por ejemplo una que podemos levantar en una imagen de docker, entonces sería bueno tener ese "seed" o información semilla para que otros programadores tengan bases de datos para practicar.

- Puntualmente veremos:

  - Conectar Postgres a nuestros endpoints
  - DTOs Pattern (Data Transfer Objects)
  - Aprovisionar Postgres en la nube
  - Desplegar aplicación

### \* PASOS A REALIZAR:

- Instalaciones Necesarias:

  1. Se necesita tener instalado (para las imágenes) [Docker Desktop](https://www.docker.com/get-started/)
  2. Se necesita tener instalado (para mongo) [MongoDB Compass](https://www.mongodb.com/try/download/compass)
  3. Se necesita tener instalado (para postgres) [Table Plus](https://tableplus.com/)
  4. Alternativa para Table Plus (para postgres) [DBeaver (Community)](https://dbeaver.io/)
  5. Cualquiera de los dos ORM [TypeORM](https://typeorm.io/) o [Prisma](https://www.prisma.io/)

- Extensiones de VSCode (Instalaciones adicionales)

  1. Se necesita tener instalado [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
  2. Se necesita tener instalado [Better DockerFile Syntax](https://marketplace.visualstudio.com/items?itemName=jeff-hykin.better-dockerfile-syntax)
  3. Se necesita tener instalado [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)

- Una forma facil de levantar una imagen de mongo en docker o utilizar una imagen y colocarla en un contenedor (por si no se tiene experiencia directa utilizando docker y contenedores) es crear un file `docker-compose.yml` para seguir unas instrucciones:

  ```docker
  version: '3.8' // versión de docker

  services: // servicios que quiero correr
    mongo-db: // nombre del servicio que queremos crear
      image: mongo:6.0.6 // versión de la imagen que quiero utilizar (podemos pasarnos a la imagen versión 4 o 5 o X sin pasar por todo el proceso engorroso de reinstalarlo en la computadora)
      restart: always // cuando nuestro docker desktop se levante, inmediatamente va a levantar esta imagen
      environment: // variables de entorno, que son configuraciones por defecto para que la imagen de mongodb tenga cuando se levante. Esa configuración también las colocamos en los files .env porque los archivos docker-compose.yml leen por defecto los archivos .env
        MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER} // config de variables de entorno sacadas de https://hub.docker.com/_/mongo y para usar nuestras variables de entorno se usa con ${......}
        MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASS} // config de variables de entorno sacadas de https://hub.docker.com/_/mongo y para usar nuestras variables de entorno se usa con ${......}
      volumes: // para tener la data que se va creando en un lugar aparte porque si no se tiene los volumenes entonces al eliminar nuestro contenedor junto con la imagen, entonces se perdería toda la data que se grabó en nuestra base de datos
        - ./mongo:/data/db // grabar la información que vamos guardando en una ruta que nosotros coloquemos. En este caso se creará una carpeta mongo en nuestro file system y todo lo que se graben en /data/db se grabará también en nuestra carpeta mongo de nuestro file system
      ports: // abrir nuestro contenedor en un puerto. Es la forma en cómo nos vamos a comunicar desde el mundo exterior a nuestro contenedor, lo cual lo hace bien hermético ya que si solo hay un puerto abierto entonces solo por ese puerto se puede comunicar
        - 27017:27017 // puerto para la comunicación. El puerto por defecto de mongodb es el 27017. Entonces vamos a mapear el puerto 27017 de nuestra computadora para mapear : con el puerto 27017 de la imagen que usa mongodb de nuestro contenedor, puede ser también por ejemplo 27018:27017 o #####:27017
  ```

- Abrir una terminal aparte y confirmar que tenemos docker instalado usando `docker --version`.
- Luego, docker desktop instala también el docker compose, entonces colocamos `docker compose up` y ahí veremos muchos logs, que son todas las instancias y configuraciones necesarias que creó docker y dentro de todo eso veremos un mensaje similar a "Waiting for connections..." y si abrimos docker desktop entonces veremos nuestro juego de contenedores y ahí dentro está el que nosotros creamos el servicio con el nombre de `mongo-db` y veremos como `mongo-db-x` y esa -x será el número que tenemos, porque se pueden crear varias réplicas, ahí también veremos la versión de la imagen, el puerto que está mapeando, etc.
- Al hacer lo anterior entonces es medio tedioso tener una terminal abierta aparte y luego el docker desktop también porque se tiene que levantar y luego cerrar con `ctrl + c` y así sucesivamente, entonces podemos utilizar el comando `docker compose up -d` o `docker compose up --detach` lo que significa que todo va a correr pero desligado de esa terminal, lo que quiere decir que ya se puede cerrar esa terminal y nuestro docker sigue corriendo.
- Ahora, abrir MongoDB Compass y si intentamos conectarnos directamente usando lo que nos viene por defecto `mongodb://localhost:27017` entonces nos saldría un error porque nosotros configuramos variables de entorno. NOTA: si nosotros configuramos por ejemplo 27058:27017 entonces en la url iría `mongodb://localhost:27058`. PAra solucionar lo del error mencionado, ir a Advanced Connection Options -> Authentication -> Username/Password y ahí colocaremos lo que configuramos en nuestras variables de entorno -> Save & Connect y colocar por ejemplo "NOC-App-MongoDB"

- Conectar nuestra aplicación de NODE con MongoDB y uno de los paquetes más comunes es usar `https://mongoosejs.com/` que es como crear una abstracción de la base de datos y nosotros cuando queramos insertar en la base de datos lo haremos mediante unos objetos de Mongoose y esto ayuda mucho a asegurarnos de protegernos de inyección de SQLs, la data sigue cierto estándar que nosotros queremos, grabar cierta información que nosotros queremos, manejar los id, etc

- Pasos a realizar para utilizar la aplicación con mongodb y mongoose:

  1. Abrir docker desktop
  2. Abrir una terminal aparte y colocar `docker compose up` o `docker compose up -d` o `docker compose up --detach`
  3. Abrir mongo compass y conectar la base de datos
  4. Levantar la aplicación con `npm run dev`
  5. Realizar el guardado de información u obtener información de la base de datos, realizar las configuraciones necesarias, cambiar la lógica, etc

- Levantar nuestro **docker-compose.yml**

  1. Abrir Docker Desktop
  2. en la terminal `docker compose up -d`
  3. en la misma terminal u otra `npm run dev`
  4. verificar que nuestra base de datos local ya esté funcionando en Docker Desktop

- ejemplo

- ejemplo

### \* RECURSOS A USAR:

- Imagen de mongo: https://hub.docker.com/_/mongo
- Imagen de postgres: https://hub.docker.com/_/postgres
- ejemplo

- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`
- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- Para poder revisar cómo están construídas otras API como por ejemplo esta [TMDB](https://developer.themoviedb.org/reference/account-details) para conocer un poco más y tener otros ejemplos de cómo podemos ir implementando nuestras APIs.

- Se puede obviar el usar `Docker Desktop` pero es más facil usar y montar una base de datos MongoDB ahí, es más facil probar, deshacer, borrar la base de datos, volver a levantar y tener todo el ambiente de desarrollo sin que salga de nuestra computadora. Al usar docker en nuestro ambiente de desarrollo, nos va a poder permitir tener nuestra base de datos rápidamente en nuestro equipo sin pasar por todo el proceso de instalación manual. Alguans referencias:

  - https://www.youtube.com/watch?v=eKXIxSZrJfw&t=2s
  - https://www.youtube.com/watch?v=NVvZNmfqg6M
  - https://www.youtube.com/watch?v=lzRY5Z59Bso
  - https://www.youtube.com/watch?v=w1v6DspnUBQ

  - Algunos comandos de Docker:

    - `docker images` -> listar las imágenes que tengo instaladas en mi computadora usando docker
    - `docker run nombre_imagen` -> generar un contenedor de una imagen
      - NOTA: en el caso de mongo, se ejecuta un contenedor e inicia la base de datos pero como se está ejecutando desde un contenedor, este internamente tiene su configuración y aunque la base de datos se esté ejecutando no podemos acceder a ella ya que el contender no está haciendo público los puertos que utiliza, y ahí también podemos ver que mongodb ya está listo para recibir conexiones porque nos muestra un mensaje similar a "Waiting for connections on port 27017" y entonces tenemos que conectarnos a esa base de datos que está dentro de un contenedor y para eso hay que configurar algunas cosas. Por mientras presionamos "ctrl + c" para salir de ese proceso
    - `docker ps` -> listar los contenedores generados activos (es como el historial de procesos que estamos ejecutando)
    - `docker ps -a` -> listar los contenedores generados (es como el historial de procesos que hemos ejecutado)
    - `docker run -p 27017:27017 --name mydatabase mongo` -> acceder a la instancia de nuestro contenedor de mongo usando docker
      - El "-p" es para el puerto donde se está ejecutando el contenedor. Cuando ejecutamos una instancia de mongodb por defecto esta escucha en el puerto 27017 pero como está dentro de un contenedor entonces tengo que exponerlo hacia nuestra computadora donde estamos trabajando, es decir, ese puerto 27017 está de forma interna en el contenedor, si queremos acceder a ese puerto se le coloca "27017:27017" que significa que le estamos dando el puerto donde voy a conectarme en esta computadora. Es decir, se le está diciendo que queremos que se conecte a través del puerto 27017 en esta computadora donde el puerto 27017 se conectará al puerto 27017 interno del contenedor. Puede ser cualquier puerto como por ejemplo 27018:27017 o 2015:27017, etc...
      - El "--name" es para darle el nombre a la instancia (el nombre de este proceso), que por ejemplor puede ser mydatabase
    - `docker run -d -p 27017:27017 --name mydatabase mongo` -> acceder a la instancia de nuestro contenedor de mongo usando docker
      - El "-d" es detach, que quiere decir que cuando se ejecute ese comando solo me dará el id del proceso y ya se puede cerrar la terminal ya que se estará ejecutando como en segundo plano, como que en un proceso de docker y ya no es necesario tener la terminal abierta
    - - `docker run -d -p 27017:27017 -v nombre_carpeta:/data/db  --name mydatabase mongo` -> lo mismo que lo anterior pero la opción "-v" va a tomar dos rutas, la ruta actual donde se quiere guardar los datos en la computadora y la ruta donde va a estar funcionando el contenedor que mongodb guarda su configuraciòn en `/data/db` lo cual este comando puede ser tanto para llevar datos de mongo a nuestra computadora como para llevar de nuestra computadora a mongo. Guardar datos en nuestra computadora que han sido creados en instancias o contenedores de mongodb. En docker existen los "volumenes" que son prácticamente el poder alterar datos en el contenedor y que estos se vean reflejados en la computadora host (nuestra computadora donde ejecutamos docker)
    - `docker stop id_contenedor` -> para la ejecución de un contenedor (se le puede pasar el id del contenedor o sino el nombre de la instancia que hemos creado. Si se le pasa el id, como es muy largo se puede pasar solo los primeros caracteres) pero aunque se pare su ejecución, el contenedor se queda registrado
    - `docker rm id_contenedor` -> eliminar un contenedor creado en base a su id
      - `docker rm id_contenedor -f` -> eliminar un contenedor creado en base a su id de manera forzada (si aún no se detuvo ese contenedor pero igual se quiere eliminar)
    - `docker rm $(docker ps -aq)` -> eliminar todos los contenedores creados
      - El "docker ps -aq" me devuelve todos los id de los contenedores que tengo creados

  - Con lo anterior se creó un contenedor de mongodb, es decir, no se tiene instalado mongodb en la computadora, entonces para eso se necesita un programa que me permita conectarme a esa base de datos de mongodb, como por ejemplo usar `mongo compass` que es una interface gráfica o sino instalar un cliente de mongodb (en linux es facil instalarlo porque en linux hay un cliente llamado `mongo client`). Todo esto es para ver si se puede conectar a la instacia de mongodb creada anteriormente y si se conecta entonces quiere decir que todo está bien.

  - Algunos comandos de MongoDB:

    - `show dbs` -> mostrar las bases de datos de mongodb (admin, config y local son las que están por defecto)ç
    - `use nombre_base_datos` -> crear una base de datos
    - `db.nombre_coleccion.insert(opciones_a_colocar)` -> insertar un dato en nuestra base de datos
    - `show collections` -> listar las colecciones creadas
    - `db.nombre_coleccion.find()` -> listar lo que tengo dentro de la colección

- Para agregar validaciones a lo que se recibe en el body de la solicitud, se puede usar [express-validator](https://express-validator.github.io/docs/) el cual es un paquete muy popular y este nos ayuda a hacer validaciones en la parte de nuestros controladores el cual se coloca como un middleware que se ejecutará antes de la request y response, es decir, antes de que se ejecute el callback se va a ejecutar el middleware, por ejemplo:

  ```javascript
  const express = require("express");
  const app = express();

  app.use(express.json());
  app.get("/hello", (req, res) => {
    res.send(`Hello, ${req.query.person}!`);
  });

  app.listen(3000);
  ```

  - También, primero sería bueno conocer un poco de los DTO para hacer algo similar a lo anterior [Data Transfer Object DTO Definition and Usage](https://www.okta.com/identity-101/dto/) el cual sería un objeto hecho o creado para transmitir información.

- ejemplo

---

## Parte IV:

# Temas puntuales de la sección

### ¿Qué veremos en esta sección?

En esta sección, nos enfocaremos a trabajar mediante el patrón repositorio y la arquitectura limpia con casos de uso.

Es una sección recomendada, ya que aunque es importante, no quiere decir que es la única forma de trabajar, podemos usar el repositorio, controladores o inclusive los casos de uso directamente, pero si queremos implementarla a su totalidad, aquí se tiene una guía al respecto.

En la sección del testing, haremos pruebas de integración con el servidor, lo que significa que no probaremos los casos de uso, probaremos los servicios Rest directamente.

### \* PASOS A REALIZAR:

1. ejemplo
2. ejemplo
3. ejemplo

### \* RECURSOS A USAR:

- Paquete `compression` usando `npm i compression` desde `https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression`

  - Para los types usando `npm i --save-dev @types/compression`

- Paquete `nombre_paquete` usando `comando_paquete` desde `url_paquete`

### \* NOTAS:

- Buenas prácticas para Express: https://expressjs.com/en/advanced/best-practice-performance.html
- Diferencia entre el Datasource y el Repositorio

  - En este caso lucen igual pero tienen responsabilidades diferentes...

    - El objetivo de la clase abstracta de un data source, es definir cómo llegaremos a esa fuente de datos

    - El objetivo de la clase abstracta de un repositorio, es consumir ese data source.

  - ¿Por qué son similares?

    Porque queremos utilizar el repositorio para llegar a los métodos de las implementaciones del data source, pero usamos una implementación del repositorio porque así podemos cambiar el origen de datos fácilmente.

    Piensa, qué pasa si en desarrollo, tu tienes una base de datos local, digamos SQLite, haces una clase que extienda del datasource abstracto, y ahí haces todo lo que necesites.

    Luego al día de mañana, ya no usarás SQLite, usarás ISAR o un API a un backend, entonces creas otra clase que extienda de ese datasource abstracto.

    Si lo haces así, y llamas el data source desde tu repositorio, puedes cambiar de origen de datos sin tener que tocar una sola línea de código de tus implementaciones.

  Recuerda que el repositorio llama un data source, y puedes cambiarlo fácilmente. aquí aplicamos el principio de inversión de dependencias -> https://en.wikipedia.org/wiki/Dependency_inversion_principle

---
