const { spawn } = require("child_process");
const fs = require("fs/promises");
// const fs = require("fs");

const numberFormatter = spawn("./number_formatter", ["./dest.txt", "$", ","]);

numberFormatter.stdout.on("data", (data) => {
  console.log(`stdout: ${data}`);
});

numberFormatter.stderr.on("data", (data) => {
  console.log(`stderr: ${data}`);
});

numberFormatter.on("close", (code) => {
  if (code === 0) {
    console.log("Successfull");
  } else {
    console.log("Something went wrong");
  }
});

(async () => {
  const fileHandle = await fs.open("./src.txt", "r");
  const fileStream = fileHandle.createReadStream();
  fileStream.pipe(numberFormatter.stdin);
  // numberFormatter.stdin.write("24325345");
  // numberFormatter.stdin.end("23434");
  // fileHandle.close();
})();
