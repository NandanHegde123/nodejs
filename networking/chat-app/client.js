const net = require("net");

const readline = require("readline/promises");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

let id;

const client = net.createConnection(
  { host: "127.0.0.1", port: 3008 },
  async () => {
    console.log("Connected to the server");

    const ask = async () => {
      const message = await rl.question("Enter a message >");
      //moves cursor one line up
      await moveCursor(0, -1);
      //clear the current line that the cursor is in
      await clearLine(0);
      client.write(`${id}-message-${message}`);
    };

    ask();

    client.on("data", async (chunk) => {
      console.log();
      await moveCursor(0, -1);
      await clearLine(0);
      if (chunk.toString("utf-8").substring(0, 2) === "id") {
        id = chunk.toString("utf-8").substring(3);
        console.log(`Your id is ${id} \n`);
      } else {
        console.log(chunk.toString("utf-8"));
      }

      ask();
    });
  }
);

client.on("end", () => {
  console.log("Connection has ended! ");
});
