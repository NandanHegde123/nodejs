const net = require("net");
const fs = require("fs/promises");

const server = net.createServer(() => {});

server.on("connection", (socket) => {
  console.log("new connection");
  let fileHandle, writeStream;

  socket.on("data", async (data) => {
    if (!fileHandle) {
      socket.pause(); //no longer recieve data from client

      const indexOfDivider = data.indexOf("------");
      const fileName = data.subarray(10, indexOfDivider).toString("utf-8");

      fileHandle = await fs.open(`storage/${fileName}`, "w");
      writeStream = fileHandle.createWriteStream();

      writeStream.write(data.subarray(indexOfDivider + 7));

      socket.resume(); //resume receiving data from client

      writeStream.on("drain", () => {
        socket.resume();
      });
    } else {
      if (!writeStream.write(data)) {
        socket.pause();
      }
    }

    //writing to destination
    // writeStream.write(data);
  });

  socket.on("end", async () => {
    console.log("Connection Ended");
    await fileHandle.close();
    fileHandle = undefined;
    writeStream = undefined;
  });
});

server.listen(5050, "::1", () => {
  console.log("Uploader server opened on", server.address());
});
