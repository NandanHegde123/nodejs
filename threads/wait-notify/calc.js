const { workerData } = require("worker_threads");

const flag = new Int32Array(workerData.flag);

i = 0;

while (true) {
  i++;
  if (i === 1000) {
    Atomics.wait(flag, 0, 0); //typed array, index, expected value, timeout
  }
  if ((i = 10000)) {
    break;
  }
}
