const { Worker } = require("worker_threads");
const readline = require("readline");

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

r1.question("From where should i start counting prime numbers", (input) => {
  let start = Number(input);
  r1.question("how many prime numbers do you want:", (input) => {
    let count = Number(input);
    while (count - 10 >= 0) {
      const batch = 10;
      const thread = new Worker("./calc.js");
      thread.postMessage({ start: start, count: batch });
      thread.on("message", (msg) => {
        console.log("worker found primes are:", msg);
      });
      start += 100;
      count -= batch;
    }
    const thread = new Worker("./calc.js");
    thread.postMessage({ start: start, count: count });
    thread.on("message", (msg) => {
      console.log("worket found primes are:", msg);
    });
  });
});

// console.time("start");

// console.log(generatePrimes(10, 2));

// console.timeEnd("start");
