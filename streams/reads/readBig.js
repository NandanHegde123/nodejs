const fs = require("fs/promises");
(async () => {
  const fileHandleRead = await fs.open("text.txt", "r");
  const fileHandleWrite = await fs.open("dest.txt", "w");

  const streamRead = fileHandleRead.createReadStream();
  const streamWrite = fileHandleWrite.createWriteStream();

  let split = "";
  streamRead.on("data", (chunk) => {
    const numbers = chunk.toString("utf-8").split("  ");

    if (Number(numbers[0]) !== Number(numbers[1]) - 1) {
      if (split) {
        numbers[0] = split.trim() + numbers[0].trim();
      }
    }

    if (
      Number(numbers[numbers.length - 2]) + 1 !==
      Number(numbers[numbers.length - 1])
    ) {
      split = numbers.pop();
    }

    console.log(numbers);

    numbers.forEach((number, index) => {
      let n = Number(number);
      if (n === 999999) {
        return streamWrite.end();
      }
      if (n % 2 === 0) {
        if (!streamWrite.write(" " + n + " ")) {
          streamRead.pause();
        }
      }
    });
  });

  streamWrite.on("drain", () => {
    streamRead.resume();
  });

  streamRead.on("end", () => {
    fileHandleRead.close();
    console.log("Done Reading");
  });
  streamWrite.on("finish", () => {
    fileHandleWrite.close();
    console.log("Done Writing");
  });
})();
