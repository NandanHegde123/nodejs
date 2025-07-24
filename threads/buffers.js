const { Buffer } = require("buffer");

// const buf1 = Buffer.alloc(19, "This is some string");
//const buf1=Buffer.from("This is some string"); // allocates from buffer pool

// const buf2 = new Int32Array(16);
// const buf3 = new Uint8Array(16);

// buf2[1] = -54;
// buf3[1] = -54;

// buf2[0] = 520;
// // buf3[0] = 300;

// // console.log(buf1.buffer);
// // console.log(buf1.byteOffset);
// // console.log(buf1.byteLength);
// // console.log(Buffer.poolSize);

// console.log(buf2);
// console.log(buf2.buffer);
// console.log(buf3);
// console.log(buf3.buffer);

// const rawBuf = new ArrayBuffer(20);
// // const viewBuf = new Uint8Array(rawBuf);
// const viewBuf = Buffer.from(rawBuf);
// rawBuf[1] = 34;
// viewBuf[1] = 34;
// console.log(rawBuf);
// console.log(viewBuf);
