const http = require("http");
const fs = require("fs/promises");

class MiniExpress {
  constructor() {
    this.server = http.createServer();
    this.routes = {};
    this.middleware = [];

    this.server.on("request", (request, response) => {
      // console.log("A request came in!");

      //send a file back to the client
      response.sendFile = async (path, mime) => {
        const fileHandle = await fs.open(path, "r");
        const readStream = fileHandle.createReadStream();

        response.setHeader("Content-Type", mime);

        readStream.pipe(response);
      };

      //set the status code of the response
      response.status = (code) => {
        response.statusCode = code;
        return response;
      };

      //send json data back to the client for small data less than high watermark value
      response.json = (data) => {
        response.setHeader("Content-Type", "application/json");
        // response.end(JSON.stringify(data));
        const json = JSON.stringify(data);
        let start = 0;
        const chunkSize = response.writableHighWaterMark;
        const length = json.length;
        const write = () => {
          while (start < length) {
            const chunk = json.slice(start, start + chunkSize);
            start += chunkSize;
            if (!response.write(chunk)) {
              return;
            }
          }
          response.end();
        };
        write();
        response.on("drain", () => {
          write();
        });
      };

      // if (!this.routes[request.method.toLowerCase() + request.url]) {
      //   return response
      //     .status(404)
      //     .json({ error: `Cannot find ${request.method} ${request.url}` });
      // }

      //Run all the middleware func
      // this.middleware[0](request, response, () => {
      //   this.middleware[1](request, response, () => {
      //     this.middleware[2](request, response, () => {
      //       this.routes[request.method.toLowerCase() + request.url](
      //         request,
      //         response
      //       );
      //     });
      //   });
      // });

      const runMiddleware = (req, res, middleware, index) => {
        if (index === middleware.length) {
          if (!this.routes[request.method.toLowerCase() + request.url]) {
            return response
              .status(404)
              .json({ error: `Cannot find ${request.method} ${request.url}` });
          }
          //run route -exit point
          this.routes[request.method.toLowerCase() + request.url](req, res);
        } else {
          middleware[index](req, res, () => {
            runMiddleware(req, res, middleware, index + 1);
          });
        }
      };

      runMiddleware(request, response, this.middleware, 0);
    });
  }

  route(method, path, cb) {
    this.routes[method + path] = cb;
  }

  beforeEach(cb) {
    this.middleware.push(cb);
  }

  listen = (port, cb) => {
    this.server.listen(port, () => {
      cb();
    });
  };
}

module.exports = MiniExpress;
