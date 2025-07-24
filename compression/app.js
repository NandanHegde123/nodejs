const zlib = require("zlib");
const fs = require("fs");

const src = fs.createReadStream("./text.txt");
const dest = fs.createWriteStream("./dest.gz");

//loseless compression-gzip brotli deflate
src
  .pipe(
    zlib.createGzip({
      windowBits: 12,
    })
  )
  .pipe(dest);

zlib.createGunzip();
