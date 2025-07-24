const generatePrimes = require("../lib/primegenerator");
const { workerData, parentPort } = require("worker_threads");

const primes = generatePrimes(workerData.count, workerData.start, {
  format: true,
});

parentPort.postMessage(primes);
