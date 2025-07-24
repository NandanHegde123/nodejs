const { workerData, parentPort } = require("worker_threads");
const crypto = require("crypto");

const BATCH_SIZE = 4096;
const buffer = Buffer.alloc(BATCH_SIZE);

function fillBuffer() {
  crypto.randomFillSync(buffer);
}

function readRandomNumber(offset) {
  const randomNumber = buffer.readUInt16BE(offset);
  return randomNumber;
}

// function generateRandomNumber() {
//   crypto.randomFillSync(buffer);
//   const randomValue = buffer.readUInt16BE(0); // read the buffer as an unsigned 16-bit integer
//   return randomValue;
// }

let sum = 0;
let random;
let bufferOffset = 0;

fillBuffer();

for (let i = 0; i < workerData.count; i++) {
  if (bufferOffset >= BATCH_SIZE) {
    fillBuffer();
    bufferOffset = 0;
  }
  random = readRandomNumber(bufferOffset);
  bufferOffset += 2;
  sum += random;

  if (sum > 100_000_000) {
    sum = 0;
  }
}

parentPort.postMessage(sum);
