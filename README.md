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
- ejemplo
- ejemplo

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

- Los Middelwares son funciones que se van a ejecutar en todo momento que se pase por una ruta. Los Middlewares son softwares que se sitúan entre un sistema operativo y las aplicaciones que se ejecutan en él. Básicamente, funcionan como una capa de traducción oculta para permitir la comunicación y la administración de datos en aplicaciones distribuidas las cuales estas son una aplicación con distintos componentes que se ejecutan en entornos separados, normalmente en diferentes plataformas conectadas a través de una red.

- ejemplo

---
