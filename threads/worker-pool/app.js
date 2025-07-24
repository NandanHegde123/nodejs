const Pool = require("./pool.js");
const readLine = require("readline");
const { performance } = require("perf_hooks");

// const r1 = readLine.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// r1.question("How many worker threads do you want?", (answer)=>{})

const numWorkers = 4; //process.argv[2]
const pool = new Pool(numWorkers);

const totalTasks = 20_000;
let result = [];
let tasksDone = 0;
const batchSize = 1000;
let batchIndex = 0;

function submitBatch(startIndex, endIndex) {
  let batchTaskCount = 0;

  for (let i = startIndex; i < endIndex; i++) {
    batchTaskCount++;

    pool.submit(
      "generatePrimes",
      { count: 20, start: 10_000_000 + i * 50, format: true, log: false },
      (primes) => {
        tasksDone++;
        batchTaskCount--;
        console.log("Primes generated");
        // console.log(primes);
        result = result.concat(primes);

        //when all tasks are done
        if (tasksDone === totalTasks) {
          console.log(result.sort());
          process.exit();
        }

        //when a batch is complete
        if (batchTaskCount === 0) {
          batchIndex++;
          submitNextBatch();
        }
      }
    );
  }
}

function submitNextBatch() {
  if (batchIndex * batchSize < totalTasks) {
    const startIndex = batchIndex * batchSize;
    const endIndex = Math.min(
      (batchIndex + 1, totalTasks) * batchSize,
      totalTasks
    );
    submitBatch(startIndex, endIndex);
  }
}

submitNextBatch();
