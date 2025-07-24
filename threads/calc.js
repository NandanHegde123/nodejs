const { Worker, workerData } = require("worker_threads");

// console.log(workerData);

// const obj = workerData;
// obj.name = "Cat";
// console.log(obj);

const port = workerData.port;
// // console.log(port);
// console.log(workerData);

port.on("message", (msg) => {
  console.log("Worker recived:", msg);
});

port.postMessage("some text for testing");

// const port = workerData.port;

// port.on("message", (msg) => {
//   setTimeout(() => {
//     console.log("Message recived from main thread    \n", msg);
//     port.postMessage("Sending message to main thread\n");
//   }, 1000);
// });

//previous
// const fs = require("fs");

// // new Worker("./calc.js");

// // setTimeout(() => {
// //   fs.writeFile("./text.txt", "This is some text from worker thread", (err) => {
// //     if (err) {
// //       return console.log(err);
// //     }
// //     console.log("File created successfully!");
// //   });
// // }, 3000);

// // const a = 1000;

// // console.log(a);

// // for (let i = 0; i < 10000000000; i++) {}

// // setInterval(() => {}, 50);

// // process.exit(0);
