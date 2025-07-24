const http = require("http");

const PORT = 9000;

const mainServers = [
  { host: "localhost", port: 8000 },
  { host: "localhost", port: 8001 },
];

const proxy = http.createServer();

proxy.on("request", (clientRequest, proxyResponse) => {
  //slecting server using round-robin algo
  const mainServer = mainServers.shift();
  mainServers.push(mainServer);

  const proxyRequest = http.request({
    hostname: mainServer.host,
    port: mainServer.port,
    method: clientRequest.method,
    path: clientRequest.url,
    headers: clientRequest.headers,
  });

  proxyRequest.on("response", (mainServerResponse) => {
    proxyResponse.writeHead(
      mainServerResponse.statusCode,
      mainServerResponse.statusMessage,
      mainServerResponse.headers
    );

    mainServerResponse.pipe(proxyResponse);
  });

  clientRequest.pipe(proxyRequest);
});

proxy.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
