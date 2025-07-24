const generatePrimes = require("./primeGenerator");
const { parentPort, workerData } = require("worker_threads");

const primes = workerData.primes;

parentPort.on("message", ({ taskName, options }) => {
  switch (taskName) {
    case "generatePrimes":
      const primes = generatePrimes(options.count, options.start, {
        format: options.format,
        log: options.log,
      });
      parentPort.postMessage(primes);

    default:
      parentPort.postMessage("Unknown task");
  }
});
