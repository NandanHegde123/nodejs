const { Worker, MessageChannel, workerData } = require("worker_threads");

//example 1
// const obj = { name: "Joe" };

// new Worker("./calc.js", { workerData: obj });

// // new Worker("./calc.js", { workerData: "Some text" });

//example 2 message channels
// const channel = new MessageChannel();
// console.log(channel);

// const port1 = channel.port1;
// const port2 = channel.port2;

// port1.postMessage({ name: "Joe" });
// port2.postMessage({ name: "Cat" });

// port1.on("message", (msg) => {
//   console.log(`Message recieved on port 1 ${msg}`, msg);
// });

// port2.on("message", (msg) => {
//   console.log(`Message recieved on port 2 ${msg}`, msg);
// });

//exampl 3 communiction between worker threads
// const { port1, port2 } = new MessageChannel();

// const thread1 = new Worker("./calc.js", {
//   workerData: { port: port1 },
//   transferList: [port1],
// });
// const thread2 = new Worker("./calc.js", {
//   workerData: { port: port2 },
//   transferList: [port2],
// });

//example 4 communication between main and worker
// const { port1, port2 } = new MessageChannel();

// const thread1 = new Worker("./calc.js", {
//   workerData: { port: port2 },
//   transferList: [port2],
// });

// setTimeout(() => {
//   port1.postMessage("Sending message to worker thread\n");
// }, 1000);

// port1.on("message", (msg) => {
//   setTimeout(() => {
//     console.log("Recieved message from worker thread\n", msg);
//   }, 1000);
// });

//example 5 multiple threads
// const channel1 = new MessageChannel();
// const channel2 = new MessageChannel();

// const thread1 = new Worker("./calc.js", {
//   workerData: { port: channel1.port2 },
//   transferList: [channel1.port2],
// });

// const thread2 = new Worker("./calc.js", {
//   workerData: { port: channel2.port2 },
//   transferList: [channel2.port2],
// });

// channel1.port1.on("message", (msg) => {
//   console.log("Main thread got this on channel 1:", msg);
// });

// channel2.port1.on("message", (msg) => {
//   console.log("Main thread got this on channel 2:", msg);
// });

// channel1.port1.postMessage("some text from main thread");
// channel2.port1.postMessage("some text from main thread");

//previous
// console.log("Main threa:", obj);

// const a = 400;

// new Worker("./calc.js");

// // for (let i = 0; i < 4; i++) {
// //   const thread1 = new Worker("./calc.js");
// // }

// // while (true) {}
// // const thread1 = new Worker("./calc.js");
// // const thread2 = new Worker("./calc.js");

// // for (let i = 0; i < 10000000000; i++) {}
// // setInterval(() => {
// //   const thread3 = new Worker("./calc.js");
// // }, 0);

// console.log(a);
