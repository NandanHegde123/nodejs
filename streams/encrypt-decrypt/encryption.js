//encrypt/decrypt=crypto
//hashing-salting= crypto
//compression=zlib
//decoding/encoding=buffer
const { Transform } = require("stream");
const fs = require("fs/promises");

class Encrypt extends Transform {
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; i++) {
      //adding 1 to encrypt
      if (chunk[i] !== 255) chunk[i] += 1;
    }
    console.log(chunk.toString("utf-8"));
    // this.push(chunk);
    callback(null, chunk);
    // callback(chunk);
  }
}
(async () => {
  const readFileHandle = await fs.open("read.txt", "r");
  const writeFileHandle = await fs.open("write.txt", "w");

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();

  const encrypt = new Encrypt();

  readStream.pipe(encrypt).pipe(writeStream);
})();
