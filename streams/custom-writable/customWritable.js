const { Writable } = require("stream");
// const fsPromises = require("fs/promises");
const fs = require("fs");

class FileWriteStream extends Writable {
  constructor({ highWaterMark, fileName }) {
    super({ highWaterMark });
    this.fileName = fileName;
    this.fd = null;
    this.chunks = [];
    this.chunksSize = 0;
    this.writesCount = 0;
  }

  //runs after constructor and it will put off calling other methods untill we call the callback function
  _construct(callback) {
    fs.open(this.fileName, "w", (err, fd) => {
      if (err) {
        //so if we call the callback with an argument, it means we have an error and should not proceed ahead
        //emits error event
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _write(chunk, encoding, callback) {
    this.chunks.push(chunk);
    this.chunksSize += chunk.length;
    if (this.chunksSize > this.writableHighWaterMark) {
      fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
        if (err) {
          return callback(err);
        }
        this.chunks = [];
        this.chunksSize = 0;
        ++this.writesCount;
        callback();
      });
    } else {
      callback();
    }
    // console.log(this.fd);
  }
  _final(callback) {
    fs.write(this.fd, Buffer.concat(this.chunks), (err) => {
      if (err) return callback(err);
      this.chunks = [];
      this.chunksSize = 0;
      this.writesCount += 1;
      // this.writesCount += 1;
      callback();
      // console.log("check");
    });
  }
  _destroy(error, callback) {
    console.log(`Number of writes:${this.writesCount} `);
    if (this.fd) {
      fs.close(this.fd, (err) => {
        callback(err || error);
      });
    } else {
      callback(error);
    }
  }
}
// const stream = new FileWriteStream({
//   highWaterMark: 1800,
//   fileName: "text.txt",
// });
// stream.write(Buffer.from("Hello"));
// stream.end(Buffer.from("Last write"));
// stream.on("finish", () => {
//   console.log("stream was finished ");
// });
// // let drain = 0;
// stream.on("drain", () => {
//   // drain += 1;
//   console.log("drain1");
// });
module.exports = FileWriteStream;
