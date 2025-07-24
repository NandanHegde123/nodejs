const MiniExpress = require("../miniexpress");

const PORT = 4060;

const server = new MiniExpress();

server.route("get", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
  res.sendFile("./public/scripts.js", "text/javascript");
});

server.route("post", "/login", (req, res) => {
  res.status(400).json({ message: "Bad login info" });
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
