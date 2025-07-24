const http = require("http");
const fs = require("fs/promises");

const server = http.createServer();

server.on("request", async (request, response) => {
  // console.log(request.url);=/
  // console.log(request.method);=GET
  if (request.url === "/" && request.method === "GET") {
    response.setHeader("Content-Type", "text/html");
    const fileHandle = await fs.open("./public/index.html");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(response);

    // response.write();
  }
  if (request.url === "/styles.css" && request.method === "GET") {
    response.setHeader("Content-Type", "text/css");
    const fileHandle = await fs.open("./public/styles.css");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(response);

    // response.write();
  }

  if (request.url === "/scripts.js" && request.method === "GET") {
    response.setHeader("Content-Type", "application/javascript");
    const fileHandle = await fs.open("./public/scripts.js");
    const fileStream = fileHandle.createReadStream();

    fileStream.pipe(response);

    // response.write();
  }

  if (request.url === "/login" && request.method === "POST") {
    response.setHeader("Content-Type", "application/json");
    response.statusCode = 200;
    const body = {
      message: "Logging you in ",
    };
    response.end(JSON.stringify(body));
  }

  if (request.url === "/user" && request.method === "PUT") {
    response.setHeader("Content-Type", "application/json");
    response.statusCode = 200;
    const body = {
      message: "Updating user information ",
    };
    response.end(JSON.stringify(body));
  }

  //upload
  if (request.url === "/upload" && request.method === "PUT") {
    response.setHeader("Content-Type", "application/json");
    const fileHandle = await fs.open("./storage/resume.pdf", "w");

    const fileStream = fileHandle.createWriteStream();

    request.pipe(fileStream);

    request.on("end", () => {
      response.end(
        JSON.stringify({ message: "File was uploaded successfully" })
      );
    });
  }
});

server.listen(9000, () => {
  console.log("Web server is live at http://localhost:9000");
});
