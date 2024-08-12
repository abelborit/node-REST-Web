import fs from "fs";

/* el http2 es un nuevo protocolo (ya viene el http3). Es un nuevo tipo en donde se puede mandar información y hacer pushes y eso ayuda al navegador web a mantener mejor el cache, más rápido, más eficiente */
/* link para ver un poco más sobre http2 -> https://web.dev/articles/performance-http2 */
import http2 from "http2";

/* para sacar el SSL en linux y MAC basta con colocar este comando en al terminal `openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt` */
const server = http2.createSecureServer(
  {
    key: fs.readFileSync("./keys/server.key"),
    cert: fs.readFileSync("./keys/server.crt"),
  },
  (request, response) => {
    // console.log({ request, response });
    console.log(request.url);

    // response.write("Hola Mundo"); // escribir una respuesta
    // response.end() // terminar esa respuesta

    // response.writeHead(200, { "Content-Type": "text/html" });
    // response.write(`<h1>URL: "${request.url}"</h1>`); // sería contenido generado desde el lado del servidor o el SSR - Server Side Rendering
    // response.end();

    // const data = { name: "John Doe", age: 30, city: "New York" };
    // response.writeHead(200, { "Content-Type": "application/json" });
    // response.write(JSON.stringify(data));
    // response.end();
    /* también se puede colocar en el end de forma directa y nos ahorramos colocar la línea de código con el write(......) */
    // response.end(JSON.stringify(data));

    if (request.url === "/") {
      const htmlFile = fs.readFileSync("./public/index.html", "utf-8");

      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(htmlFile);
      response.end();

      return;
    } /* else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end();
  } */

    if (request.url?.endsWith(".js")) {
      response.writeHead(200, { "Content-Type": "application/javascript" });
    } else if (request.url?.endsWith(".css")) {
      response.writeHead(200, { "Content-Type": "text/css" });
    }

    /* para no tener problema con el /favicon.ico porque sino da un error */
    try {
      /* para todo lo demás que viene */
      const responseContent = fs.readFileSync(
        `./public${request.url}`,
        "utf-8"
      );
      response.write(responseContent);
      response.end();
    } catch (error) {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end();
    }
  }
);

server.listen(8080, () => {
  console.log("Server running on port 8080 ✅");
});
