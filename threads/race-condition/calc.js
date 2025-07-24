const { workerData, threadId } = require("worker_threads");

const numberBuf = new Uint32Array(workerData.number);

// const data2 = Buffer.from(workerData.data2);

for (let i = 0; i < 5000000; i++) {
  //This is our critical section
  //read then write-2 operations
  // numberBuf[0] = numberBuf[0] + 1;
  Atomics.add(numberBuf, 0, 1);

  // setTimeout(() => {
  //   numberBuf[0] = numberBuf[0] + 1;
  // }, 200 * threadId);
}
