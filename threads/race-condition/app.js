const { Worker } = require("worker_threads");
const { Buffer } = require("buffer");

// const obj = { name: "Joe" };

const number = Buffer.from(new SharedArrayBuffer(4)); // 32 bit number
// const data2 = Buffer.from(new SharedArrayBuffer(16));
//const data = Buffer.from(new ArrayBuffer(8));

const THREADS = 8;
let completed = 0;

for (let i = 0; i < THREADS; i++) {
  const worker = new Worker("./calc.js", {
    workerData: { number: number.buffer },
  });

  worker.on("exit", () => {
    completed++;

    if (completed === THREADS) {
      console.log("Final number is: ", number.readUInt32LE());
    }
  });
}
