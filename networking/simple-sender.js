const net = require("net");

const socket = net.createConnection({ host: "127.0.0.1", port: 3099 }, () => {
  const buff = Buffer.alloc(2);
  buff[0] = 12;
  buff[1] = 34;
  // socket.write("A simple message coming from simple-sender!");
  socket.write(buff);
  // console.log(buff);
});
