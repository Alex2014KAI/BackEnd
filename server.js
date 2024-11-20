const http = require("http");
const fs = require("fs");

let requestCounter = 0;

const delay = (ms) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms);
  });
};

const readFile = (fileLocation) => {
  return new Promise((res, rej) => {
    fs.readFile(fileLocation, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
};

const server = http.createServer(async (request, response) => {
  requestCounter++;

  switch (request.url) {
    case "/work": {
      const start = new Date();
      while (new Date() - start < 1000) {
        console.log(new Date() - start);
      }
      response.write(`WORK`);
      response.end();
      break;
    }

    case "/delay": {
      await delay(3000);
      response.write(`DVR ${requestCounter}`);
      response.end();
      break;
    }

    case "/first": {
      try{const data = await readFile("pages/home.html");
        response.write(data);
        response.end();
      }
      catch(err){
        response.write("Error 500");
        response.end();
      }
      break;
    }
    case "/DVRPaches": {
      try{const data = await readFile("../4.DVRPictures/DVR_picture/index.html");
        response.write(data);
        response.end();
      }
      catch(err){
        response.write("Error 500");
        response.end();
      }
      break;
    }

    default:
      response.write("404 ERROR: not found");
      response.end();
      break;
  }
  // response.write(`DVR ${requestCounter}`);
  // response.end();
});

server.listen(3003);
