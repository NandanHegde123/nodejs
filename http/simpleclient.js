const http = require("http");

const agent = new http.Agent({ keepAlive: true });

// const len1 = Buffer.byteLength(
//   JSON.stringify({ message: "Hi there!" }),
//   "utf-8"
// );

// const len2 = Buffer.byteLength(
//   JSON.stringify({ message: "How are you doing" }),
//   "utf-8"
// );

// const len3 = Buffer.byteLength(
//   JSON.stringify({ message: "Nita is a cat " }),
//   "utf-8"
// );

const request = http.request({
  agent: agent,
  hostname: "localhost",
  port: 8050,
  method: "POST",
  path: "/create-post",
  headers: {
    "Content-Type": "application/json",
    name: "John Doe",
  },
});

//This event is emitted only once
request.on("response", (response) => {
  console.log("STATUS");
  console.log(response.statusCode);
  console.log("MESSAGE");
  console.log(response.statusMessage);
  console.log("HEADERS");
  console.log(response.headers);
  console.log("BODY");
  response.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"));
  });

  response.on("end", () => {
    console.log("Done!");
  });
});

// request.write(JSON.stringify({ title: "Title of my post" }));
request.end(
  JSON.stringify({
    title: "Title of my post",
    body: "This is some text and more and more",
  })
);
// request.write(JSON.stringify({ message: "Nita is a cat " }));

// request.end(JSON.stringify({ message: "Last message" }));
