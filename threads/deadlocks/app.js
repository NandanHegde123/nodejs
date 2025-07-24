const { Worker } = require("worker_threads");
const { Buffer } = require("buffer");
//while(seal==1){}              while(seal==1){}
//seal=1                        seal=1
//critical section              critical section
//seal=0                        seal=0

// const obj = { name: "Joe" };

const number = Buffer.from(new SharedArrayBuffer(4)); // 32 bit number
const A = new SharedArrayBuffer(4);
const B = new SharedArrayBuffer(4);

const THREADS = 1;
let completed = 0;

for (let i = 0; i < THREADS; i++) {
  const worker1 = new Worker("./calc1.js", {
    workerData: { number: number.buffer, A, B },
  });
  const worker2 = new Worker("./calc2.js", {
    workerData: { number: number.buffer, A, B },
  });

  // worker.on("exit", () => {
  //   completed++;

  //   if (completed === THREADS) {
  //     console.log("Final number is: ", number.readUInt32LE());
  //   }
  // });
}
