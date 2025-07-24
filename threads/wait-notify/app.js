const { Worker } = require("worker_threads");
const { performance } = require("perf_hooks");

const flag = new Int32Array(new SharedArrayBuffer(4));

const start = performance.now();
let completed = 0;
// const workers = [];

for (let i = 0; i < 8; i++) {
  const worker = new Worker("./calc.js", { workerData: { flag: flag.buffer } });
  worker.on("exit", () => {
    completed++;
    if (completed === 8) {
      console.log("time taken:");
      console.log(performance.now() - start);
    }
  });
}

setTimeout(() => {
  Atomics.notify(flag, 0, 1); //typed array, index, no of workers to wakeup
}, 3000);
