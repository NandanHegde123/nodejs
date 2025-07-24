const generatePrimes = require("./primeGenerator");
const { parentPort, workerData } = require("worker_threads");

const primes = new BigInt64Array(workerData.primes);
const primeSeal = new Int32Array(workerData.primeSeal);

function lock(seal) {
  while (Atomics.compareExchange(seal, 0, 0, 1) === 1) {
    Atomics.wait(seal), 0, 1;
  }
}

function unlock(seal) {
  Atomics.store(seal, 0, 0);
  Atomics.notify(seal, 0, 1);
}

parentPort.on("message", ({ taskName, options }) => {
  switch (taskName) {
    case "generatePrimes":
      const generatedPrimes = generatePrimes(options.count, options.start, {
        format: options.format,
        log: options.log,
      });

      lock(primeSeal);
      const offset = primes.indexOf(0n);
      primes.set(generatedPrimes, offset);
      parentPort.postMessage("done");
      unlock(primeSeal);

    default:
      parentPort.postMessage("Unknown task");
  }
});
