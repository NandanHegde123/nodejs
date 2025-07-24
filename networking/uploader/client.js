const net = require("net");
const fs = require("fs/promises");
const path = require("path");

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

const socket = net.createConnection({ host: "::1", port: 5050 }, async () => {
  const filePath = process.argv[2];
  const fileName = path.basename(filePath);

  // const filePath = "./test.txt";
  const fileHandle = await fs.open(filePath, "r");
  const readStream = fileHandle.createReadStream();
  const fileSize = (await fileHandle.stat()).size;
  //for getting the upload progress
  let uploadedPercentage = 0;
  let bytesUploaded = 0;

  socket.write(`filename: ${fileName}------`);

  console.log(); //done to get log of percentage
  //reading from source file
  readStream.on("data", async (chunk) => {
    // socket.write(chunk);
    if (!socket.write(chunk)) {
      readStream.pause();
    }

    bytesUploaded += chunk.length;
    let newPercentage = Math.floor((bytesUploaded / fileSize) * 100);
    if (newPercentage !== uploadedPercentage) {
      uploadedPercentage = newPercentage;
      await moveCursor(0, -1);
      await clearLine(0);
      console.log(`Uploading ...${uploadedPercentage}`);
    }
  });

  socket.on("drain", () => {
    readStream.resume();
  });

  readStream.on("end", () => {
    console.log("The file was successfully uploaded");
    socket.end();
  });
});
