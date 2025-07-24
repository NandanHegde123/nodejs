const { workerData, threadId } = require("worker_threads");
//while(seal==1){}              while(seal==1){}
//seal=1                        seal=1
//critical section              critical section
//seal=0                        seal=0

const numberBuf = new Uint32Array(workerData.number);
const seal = new Uint8Array(workerData.seal);

// const data2 = Buffer.from(workerData.data2);

//compareexachange-typedarray, index, expectedvalue, replacementvalue and returns output

for (let i = 0; i < 5000000; i++) {
  while (Atomics.compareExchange(seal, 0, 0, 1) === 1) {}
  //This is our critical section
  numberBuf[0] = numberBuf[0] + 1;
  Atomics.store(seal, 0, 0);
}
