const fs = require("fs/promises");
const { pipeline } = require("stream");
// (async () => {
//   const copyFileHandler = await fs.open("text.txt", "r");
//   const destFileHandler = await fs.open("text-copy.txt", "w");

//   let bytesRead = 16384;
//   while (bytesRead === 16384) {
//     const readResult = await copyFileHandler.read();
//     bytesRead = readResult.bytesRead;
//     console.log(readResult.buffer);

//     if (bytesRead !== 16384) {
//       const indexOfNotFilled = readResult.buffer.indexOf(0);
//       const finalBuffer = readResult.buffer.subarray(0, indexOfNotFilled);
//       return await destFileHandler.write(finalBuffer);
//     }

//     await destFileHandler.write(readResult.buffer);
//   }
//   // const content = buff.toString("utf-8");
//   await copyFileHandler.close();
//   await destFileHandler.close();
// })();

(async () => {
  const copyFileHandler = await fs.open("text.txt", "r");
  const destFileHandler = await fs.open("text-copy.txt", "w");

  const readStream = copyFileHandler.createReadStream();
  const writeStream = destFileHandler.createWriteStream();

  // console.log(readStream.readableFlowing);
  // readStream.pipe(writeStream);
  // console.log(readStream.readableFlowing);
  // readStream.unpipe(writeStream);
  // console.log(readStream.readableFlowing);
  // readStream.pipe(writeStream);
  // console.log(readStream.readableFlowing);

  pipeline(readStream, writeStream, (err) => {
    if (err) console.log(err);
  });

  // const content = buff.toString("utf-8");
  writeStream.on("finish", () => {
    copyFileHandler.close();
    destFileHandler.close();
  });
})();
