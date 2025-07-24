const MiniExpress = require("../miniexpress");

//a sample object in this array would look like:
//{ userId: , token:}
const SESSIONS = [];

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

const PORT = 8000;

const parseCookies = (cookieHeader) => {
  const cookies = {};
  if (!cookieHeader) return cookies;

  cookieHeader.split(";").forEach((cookie) => {
    const [name, ...rest] = cookie.trim().split("=");
    cookies[name] = rest.join("=");
  });

  return cookies;
};

const server = new MiniExpress();

//authentication
server.beforeEach((req, res, next) => {
  // console.log("1 middleware func");
  const routesToAuthenticate = [
    "GET /api/user",
    "PUT /api/user",
    "POST /api/posts",
    "DELETE /api/logout",
  ];

  if (routesToAuthenticate.indexOf(req.method + " " + req.url) !== -1) {
    //if we have a token cookie then save userid to the req object
    if (req.headers.cookie) {
      const token = parseCookies(req.headers.cookie)["token"];

      const session = SESSIONS.find((session) => session.token === token);
      if (session) {
        req.userId = session.userId;
        return next();
        // console.log("Sending user info...");
        // const user = USERS.find((user) => user.id === session.userId);
        // res.json({ username: user.username, name: user.name });
      }
    }

    return res.status(401).json({ error: "Unauthorized" });
  } else {
    next();
  }
});

//for parsing json body
server.beforeEach((req, res, next) => {
  if (req.headers["content-type"] === "application/json") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString("utf-8");
    });

    req.on("end", () => {
      body = JSON.parse(body);
      req.body = body;
      return next();
    });
  } else {
    next();
  }
});

//for different routes that need html
server.beforeEach((req, res, next) => {
  // console.log("3 middleware func");
  const routes = ["/", "/login", "/profile", "/new-post"];
  if (routes.indexOf(req.url) !== -1 && req.method === "GET") {
    return res.status(200).sendFile("./public/index.html", "text/html");
  }
  next();
});

//file routes
// server.route("get", "/", (req, res) => {
//   console.log("last");
//   res.sendFile("./public/index.html", "text/html");
// });

// server.route("get", "/login", (req, res) => {
//   res.sendFile("./public/index.html", "text/html");
// });

server.route("delete", "/api/logout", (req, res) => {
  //remove the session object from the sessions array
  const sessionIndex = SESSIONS.findIndex(
    (session) => session.userId === req.userId
  );
  if (sessionIndex > -1) {
    SESSIONS.splice(sessionIndex, 1);
  }
  res.setHeader(
    "Set-Cookie",
    `token=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );
  res.status(200).json({ message: "Logged out successfully" });
});

// server.route("get", "/profile", (req, res) => {
//   res.sendFile("./public/index.html", "text/html");
// });

//updating userinfo
server.route("put", "/api/user", (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const password = req.body.password;

  const user = USERS.find((user) => user.id === req.userId);

  user.username = username;
  user.name = name;

  //only update password if provided
  if (password) {
    user.password = password;
  }

  res.status(200).json({
    username: user.username,
    name: user.name,
    password: password ? "updated" : "Not updated",
  });
});

server.route("get", "/styles.css", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
  res.sendFile("./public/scripts.js", "text/javascript");
});

//json routes
//log user in and generate token
server.route("post", "/api/login", (req, res) => {
  // let body = "";
  // req.on("data", (chunk) => {
  //   body += chunk.toString("utf-8");
  // });

  // req.on("end", () => {
  //   body = JSON.parse(body);
  //   console.log(body);
  const username = req.body.username;
  const password = req.body.password;

  //check if the user exists
  const user = USERS.find((user) => user.username === username);
  if (user && user.password === password) {
    //generate token
    const token = Math.floor(Math.random() * 100000000).toString();

    SESSIONS.push({ userId: user.id, token: token });

    res.setHeader("Set-Cookie", `token=${token}; Path =/;`);

    res.status(200).json({ message: "Logged in successfully" });
  } else {
    res.status(401).json({ error: "Invalid username or password" });
  }
  // });
});

//send user info
server.route("get", "/api/user", (req, res) => {
  // const token = req.headers.cookie.split("=")[1];
  // const token = parseCookies(req.headers.cookie)["token"];

  // const session = SESSIONS.find((session) => session.token === token);
  // if (session) {
  //   console.log("Sending user info...");
  const user = USERS.find((user) => user.id === req.userId);
  res.json({ username: user.username, name: user.name });
  // } else {
  //   res.status(401).json({ error: "Unauthorised" });
  // }
  // console.log(token);
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

//create a new post
server.route("post", "/api/posts", (req, res) => {
  const title = req.body.title;
  const body = req.body.body;

  const post = {
    id: POSTS.length + 1,
    title: title,
    body: body,
    userId: req.userId,
  };

  POSTS.unshift(post);
  res.status(201).json(post);
});

server.listen(PORT, () => {
  console.log("Server has started on port", PORT);
});
