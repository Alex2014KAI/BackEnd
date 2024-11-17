const http = require("http");
let requestCounter = 0;

const server = http.createServer((request, response) => {
  requestCounter++;

  switch (request.url) {
    case "/work":
      response.write(`WORK`);
      break;

    case "/DVR":
      response.write(`DVR ${requestCounter}`);
      break;

    default:
        response.write("404 ERROR: not found");
      break;
  }
  // response.write(`DVR ${requestCounter}`);
  response.end();
});

server.listen(3003);
