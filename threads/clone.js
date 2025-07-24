const v8 = require("v8");

function structuredClone(obj) {
  return v8.deserialize(v8.serialize(obj));
}

const obj = {
  // func: () => {}, not supported
  name: "Joe",
  more: {
    items: ["surfing", "skating"],
    test: {
      foo: "bar",
    },
  },
  created: new Date(),
};

const clonedObj = structuredClone(obj);
clonedObj.name = "Dylan";
clonedObj.more.test.foo = "something else";

console.log("Original object:", obj);
console.log("Cloned object:", clonedObj);
