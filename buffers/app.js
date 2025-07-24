const { Buffer } = require("buffer");

const memoryContainer = Buffer.alloc(4); //4 bytes size
//memory container can be accessed like an array
console.log(memoryContainer);
console.log(memoryContainer[0]);
memoryContainer[0] = 0xf4;
memoryContainer[1] = 0x34;
memoryContainer[2] = 0x00;
memoryContainer[3] = 0xff;
console.log(memoryContainer[0]);
console.log(memoryContainer[1]);
console.log(memoryContainer[2]);
// console.log(memoryContainer.readInt8(2));
console.log(memoryContainer[3]);
console.log(memoryContainer);
console.log(memoryContainer.toString("hex"));

const buff = Buffer.from([0x48, 0x69, 0x21]);
console.log(buff.toString("utf-8"));

//from method is pretty smart creates buffer on its own
const buf = Buffer.from("string", "utf-8");
console.log(buf);
console.log(buf.toString("utf-8"));
//.fill(x) to fill buffer with x
