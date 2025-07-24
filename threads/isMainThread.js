const { Worker, isMainThread, threadId } = require("worker_threads");

let a = 200;

// const worker = new Worker("./isMainThread.js");

if (isMainThread === true) {
  a = 500;
  const worker = new Worker("./isMainThread.js");
  console.log("THis is the main thread with id:", threadId);
  console.log(a);
} else {
  console.log("THis is a worker thread with id:", threadId);
  console.log(a);
}
