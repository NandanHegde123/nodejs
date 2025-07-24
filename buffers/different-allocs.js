const { Buffer } = require("buffer");

//method 1: second argument to fill by default is 0
const buffer = Buffer.alloc(10000, 0);

//method 2:allocUnsafe doesn't 0 out full buffer therefore faster but there might be some existing data
const unsafeBuffer = Buffer.allocUnsafe(10000);
for (let i = 0; i < unsafeBuffer.length; i++) {
  if (unsafeBuffer[i] !== 0) {
    console.log(
      `Element at position ${i} has value: ${unsafeBuffer[i].toString(2)}`
    );
  }
}

//method 3:from() use when you want to create a buffer from values.
const buf = Buffer.from("string", "utf-8");
console.log(buf);

//method 4:concat() concats a ;ist of buffers into 1 buffer
//alloc unsafe is faster because it uses pre existing buffer allocated to node plus it uses native c++ by .fill
