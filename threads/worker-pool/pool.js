const { Worker } = require("worker_threads");
const path = require("path");

class Pool {
  constructor(threadCount) {
    this.threadCount = threadCount; //nuber of threads that will be spawned
    this.threads = []; // all of our worker threads
    this.idleThreads = []; //threads that are not currently working
    this.scheduledTasks = []; // queue of tasks that need to be executed , not currently executed in one of the threads

    //spawn the threads
    for (let i = 0; i < threadCount; i++) {
      this.spawnThread();
    }
  }

  spawnThread() {
    const worker = new Worker(path.join(__dirname, "calc.js"));

    //when worker sends a message it means the task has been exeucted
    worker.on("message", (result) => {
      // console.log(result);
      const { callback } = worker.currentTask;
      if (callback) {
        callback(result);
      }
      this.idleThreads.push(worker); //thread becomes idle after finishing the task
      this.runNextTask();
    });

    this.threads.push(worker);
    this.idleThreads.push(worker); //initially all threads are idle
  }

  runNextTask() {
    if (this.scheduledTasks.length > 0 && this.idleThreads.length > 0) {
      const worker = this.idleThreads.shift();
      const { taskName, options, callback } = this.scheduledTasks.shift();

      worker.currentTask = { taskName, options, callback };

      //tell a worker to start executing the task
      worker.postMessage({ taskName, options });
    }
  }

  submit(taskName, options, callback) {
    this.scheduledTasks.push({ taskName, options, callback });
    this.runNextTask();
  }
}

module.exports = Pool;
