content = "Nita is a cat";
// const fs = require("fs/promises");
// async function writeMillionTimes(path, content) {
//   const buff = Buffer.from(content, "utf-8");
//   const offset = 0;
//   const length = buff.byteLength;
//   // const position = 0;

//   const fileHandle = await fs.open(path, "w");
//   for (let i = 0; i < 1000000; i++) {
//     await fileHandle.write(buff, offset, length);
//   }
//   fileHandle.close();
// }

//callback version
// const fs = require("fs");
// async function writeMillionTimes(path, content) {
//   const buff = Buffer.from(content, "utf-8");
//   const offset = 0;
//   const length = buff.byteLength;
//   // const position = 0;

//   fs.open(path, "w", (err, fd) => {
//     for (let i = 0; i < 1000000; i++) {
//       fs.writeSync(fd, content);
//     }
//   });
// }

//using streams
//Not a good way
// const fs = require("fs/promises");
// async function writeMillionTimes(path, content) {
//   const buff = Buffer.from(content, "utf-8");

//   // const position = 0;

//   const fileHandle = await fs.open(path, "w");
//   const stream = fileHandle.createWriteStream();

//   for (let i = 0; i < 1000000; i++) {
//     stream.write(buff);
//   }
//   fileHandle.close();
// }

//streams pt 2
const fs = require("fs/promises");
async function writeMillionTimes(path, content) {
  const fileHandle = await fs.open(path, "w");

  const stream = fileHandle.createWriteStream();
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
  });

  stream.on("finish", () => {
    fileHandle.close();
  });
  // fileHandle.close();
}

console.time("writeMany");
writeMillionTimes("text.txt", content);
console.timeEnd("writeMany");
