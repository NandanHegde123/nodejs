const EventEmitter = require("events");

class Emitter extends EventEmitter {}

// creating event emitter object
const myE = new Emitter();

// adding listener to object
myE.on("foo", () => {
  console.log("An event occured 1.");
});

myE.on("foo", () => {
  console.log("An event occured 2.");
});

myE.on("foo", (x) => {
  console.log("An event with a parameter occured.");
  console.log(x);
});

// Object.once removes the listener from the event object after getting called once
myE.once("bar", () => {
  console.log("An event occured bar");
});

//calling the listener
myE.emit("foo");
myE.emit("foo", "some text");
myE.emit("bar");

myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
myE.emit("bar");
