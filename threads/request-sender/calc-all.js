const { workerData, parentPort } = require("worker_threads");
const sendRequest = require("./sendRequest");

(async () => {
  const requestPromises = [];
  for (let i = 0; i < workerData.count; i++) {
    requestPromises.push(
      sendRequest(
        workerData.hostname,
        workerData.port,
        workerData.path,
        workerData.method
      )
    );
  }
  try {
    await Promise.all(requestPromises);
  } catch (error) {
    console.error("An error occurred:", error);
  }
  // } catch (error) {
  //   console.error("An error occurred:", error);
  // }
})();
