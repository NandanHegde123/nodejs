const { Transform } = require("stream");
const fs = require("fs/promises");

class Decrypt extends Transform {
  _transform(chunk, encoding, callback) {
    for (let i = 0; i < chunk.length; i++) {
      //subtracting 1 to decrypt
      if (chunk[i] !== 255) chunk[i] -= 1;
    }
    console.log(chunk.toString("utf-8"));
    // this.push(chunk);
    callback(null, chunk);
  }
}
(async () => {
  const readFileHandle = await fs.open("write.txt", "r");
  const writeFileHandle = await fs.open("decrypted.txt", "w");

  const readStream = readFileHandle.createReadStream();
  const writeStream = writeFileHandle.createWriteStream();

  const decrypt = new Decrypt();

  readStream.pipe(decrypt).pipe(writeStream);
})();
