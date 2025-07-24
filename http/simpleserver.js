const http = require("http");

const server = http.createServer();

server.on("request", (request, response) => {
  //http request - method, url, header, body

  console.log("METHOD");
  console.log(request.method);
  console.log("URL");
  console.log(request.url);
  console.log("HEADER");
  console.log(request.headers);
  console.log("Body");

  let data = "";
  const name = request.headers.name;

  request.on("data", (chunk) => {
    data += chunk.toString("utf-8");
    // console.log(chunk.toString("utf-8"));
  });
  request.on("end", () => {
    // const firstOccurance = data.indexOf("}");
    // const firstString = data.slice(0, firstOccurance);
    // // const secondOccurance = data.indexOf("{", firstOccurance);
    // const secondString = data.slice(firstOccurance + 2);
    // const finalString = firstString + "," + secondString;
    data = JSON.parse(data);
    console.log(data);
    console.log(name);

    response.writeHead(200, "success", { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        message: `Post with title ${data.title} was created by ${name}`,
      })
    );
  });
});

server.listen(8050, () => {
  console.log("Server listening on http://localhost:8050");
});
