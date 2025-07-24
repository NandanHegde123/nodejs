const cluster = require("cluster");

if (cluster.isPrimary) {
  console.log("Parent");
  let requestCount = 0;
  setInterval(() => {
    console.log("Total number of requests: ", requestCount);
  }, 5000);
  const coresCount = require("os").availableParallelism();
  for (let i = 0; i < coresCount; i++) {
    const worker = cluster.fork();
    worker.send("some data");
    console.log(
      `The parent process spawned a new child process with PID ${worker.process.pid} and parent ppid ${process.pid}`
    );
  }

  cluster.on("message", (worker, message) => {
    if (message.action && message.action === "request") {
      requestCount += 1;
    }
  });

  cluster.on("fork", (worker) => {});

  cluster.on("listening", (worker, address) => {});

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `worker ${worker.process.pid} ${signal || code} died. Restarting`
    );
    cluster.fork();
  });
  // cluster.fork();
} else {
  console.log("Cat Nita");
  require("./server.js");
}
