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

const totalTasks = 200;
let result = [];
let tasksDone = 0;

for (let i = 0; i < totalTasks; i++) {
  pool.submit(
    "generatePrimes",
    { count: 20, start: 100 + i * 50, format: true, log: false },
    (primes) => {
      tasksDone++;
      console.log("Primes generated");
      // console.log(primes);
      // result = result.concat(primes);

      if (tasksDone === totalTasks) {
        console.log(result.sort());
        process.exit();
      }
    }
  );
}
