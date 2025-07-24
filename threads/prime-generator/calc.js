const { parentPort } = require("worker_threads");
const generatePrimes = require("./primegenerator.js");

// const { start, batch } = workerData;

parentPort.on("message", (msg) => {
  const { start, count } = msg;
  // console.log(start);
  // console.log(count);
  const primes = generatePrimes(count, start);
  parentPort.postMessage(primes);
});

// console.log(generatePrimes(start, batch));
