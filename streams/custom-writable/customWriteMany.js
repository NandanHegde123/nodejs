content = "Nita is a cat";
const FileWriteStream = require("./customWritable.js");

const fsPromises = require("fs/promises");
const fs = require("fs");
async function writeMillionTimes(path, content) {
  const fileHandle = await fsPromises.open(path, "w");

  const stream = new FileWriteStream({
    fileName: "text.txt",
  });
  console.log(stream.writableHighWaterMark);

  // const buff = Buffer.alloc(16383, 10);
  // stream.on("drain", () => {
  //   console.log("we are now safe to write more");
  // });
  // console.log(stream.write(buff));
  // console.log(stream.write(Buffer.alloc(1, "a")));

  //stram my code
  // let i = 1000000;
  // function write() {
  //   let ok = true;
  //   // setInterval(() => {}, 1000);

  //   while (ok) {
  //     const buff = Buffer.from(content, "utf-8");
  //     ok = stream.write(buff);
  //     i -= 1;
  //     if (i === 0) {
  //       return fileHandle.close();
  //     }
  //   }
  //   if (!ok) {
  //     stream.once("drain", write);
  //   }
  // }
  // write();
  //another way
  let j = 0;
  const numberOfWrites = 1000000;
  const writeMany = () => {
    while (j < numberOfWrites) {
      const buff = Buffer.from(` ${j} `, "utf-8");
      if (j === numberOfWrites - 1) {
        return stream.end(buff); //.end emits finish event
      }
      //if stream.write returns false stop the loop
      if (!stream.write(buff)) {
        j++;
        break;
      }
      j++;
    }
  };
  writeMany();
  //resume our loop once streams buffer is empty
  stream.on("drain", () => {
    writeMany();
    console.log("drain2");
  });

  stream.on("finish", () => {
    // fileHandle.close();
  });
  fileHandle.close();
}

console.time("writeMany");
writeMillionTimes("text.txt", content);
console.timeEnd("writeMany");
