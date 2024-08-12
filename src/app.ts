import { Server } from "./presentation/server";

const main = () => {
  const server = new Server();

  server.start();
};

(async () => {
  main();
})();
