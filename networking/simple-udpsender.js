const dgram = require("dgram");

const sender = dgram.createSocket("udp4");
//max size of buffer is 9216 bytes , buffer size can be changed by converting to object {type:"udp4or6", sendBufferSize: x}
sender.send(
  "This is a string converted to a buffer",
  8000,
  "127.0.0.1",
  (error, bytes) => {
    if (error) console.log(error);
    console.log(bytes);
  }
);
