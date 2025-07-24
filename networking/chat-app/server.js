const net = require("net");

const server = net.createServer();

//an array of client sockets
const clients = [];

//socket basically means endpoint, two endpoints talking together-duplex stream

server.on("connection", (socket) => {
  console.log("A new connection was made to the server");
  const clientId = clients.length + 1;

  //broadcasting message when someone enter
  clients.map((client) => {
    client.socket.write(`User ${clientId} joined`);
  });

  //broadcasting message when someone leaves
  socket.on("end", () => {
    clients.map((client) => {
      client.socket.write(`User ${clientId} left!`);
    });
  });

  socket.write(`id-${clientId}`);
  socket.on("data", (chunk) => {
    const dataString = chunk.toString("utf-8");
    const id = dataString.substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message") + 9);

    clients.map((client) => {
      client.socket.write(`User ${id}:${message}`);
    });
    socket.write(chunk);
  });

  clients.push({ id: clientId.toString(), socket });
});

server.listen(3008, "127.0.0.1", () => {
  console.log("opened server on", server.address());
});
