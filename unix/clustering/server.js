const cpeak = require("cpeak");

const PORT = 5090;

const server = new cpeak();

process.on("message", (message) => {
  console.log(
    `worker ${process.pid} recieved this message from parent ${process.ppid}:${message}`
  );
});

process.send("data");

server.route("get", "/", (req, res) => {
  process.send({ action: "request" });
  res.json({ message: "This is some text" });
});

server.route("get", "/heavy", (req, res) => {
  process.send({ action: "request" });

  for (let i = 0; i < 1000000; i++) {}
  res.json({ message: "This is some text" });
});

server.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
