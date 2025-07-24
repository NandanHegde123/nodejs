const { workerData, threadId } = require("worker_threads");
//while(seal==1){}              while(seal==1){}
//seal=1                        seal=1
//critical section              critical section
//seal=0                        seal=0

const numberBuf = new Uint32Array(workerData.number);
const seal = new Int32Array(workerData.seal);

function lock(seal) {
  while (Atomics.compareExchange(seal, 0, 0, 1) === 1) {
    Atomics.wait(seal, 0, 1);
  }
}
function unlock(seal) {
  Atomics.store(seal, 0, 0);
  Atomics.notify(seal, 0, 1);
}

// const data2 = Buffer.from(workerData.data2);

//compareexachange-typedarray, index, expectedvalue, replacementvalue and returns output of value present in index

for (let i = 0; i < 5000000; i++) {
  lock(seal);
  //This is our critical section
  numberBuf[0] = numberBuf[0] + 1;
  unlock(seal);
}
