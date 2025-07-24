const { Worker } = require("worker_threads");
const { Buffer } = require("buffer");

const obj = { name: "Joe" };

const data = Buffer.from(new SharedArrayBuffer(8));
const data2 = Buffer.from(new SharedArrayBuffer(16));
//const data = Buffer.from(new ArrayBuffer(8));

console.log(data);
console.log(data.buffer);

console.log("Original data:", data);

for (let i = 0; i < 8; i++) {
  const worker = new Worker("./calc.js", {
    workerData: { data: data.buffer, data2: data2.buffer },
  });
}

setTimeout(() => {
  console.log("data in main after 5 seconds:", data);
  console.log("data2 in main after 5 seconds", data2);
}, 5000);
