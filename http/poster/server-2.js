const MiniExpress = require("../miniexpress");

const USERS = [
  { id: 1, name: "Liam Brown", username: "Liam123", password: "string" },
  { id: 2, name: "Lionel Messi", username: "messi123", password: "string" },
  { id: 3, name: "Ben Adams", username: "ben123", password: "string" },
];

const POSTS = [
  {
    id: 1,
    title: "This is a post title",
    body: "This is the body",
    userId: 1,
  },
];

const PORT = 8001;

const server = new MiniExpress();

//file routes
server.route("get", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/login", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
  res.sendFile("./public/scripts.js", "text/javascript");
});

//json routes

server.route("post", "/api/login", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString("utf-8");
  });

  req.on("end", () => {
    body = JSON.parse(body);
    console.log(body);
    const username = body.username;
    const password = body.password;

    //check if the user exists
    const user = USERS.find((user) => user.username === username);
    if (user && user.password === password) {
      res.status(200).json({ message: "Logged in successfully" });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  });
});

//list of all posts we have
server.route("get", "/api/posts", (req, res) => {
  const posts = POSTS.map((post) => {
    const user = USERS.find((user) => user.id === post.userId);

    post.author = user.name;
    return post;
  });
  res.status(200).json(posts);
});

server.listen(PORT, () => {
  console.log("Server has started on port", PORT);
});
