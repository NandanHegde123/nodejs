const fs = require("fs");
require("./file.js");
const path = require("path");

console.log(__dirname);

const content = fs.readFileSync(path.join(__dirname, "./text.txt"), "utf-8");
console.log(content);
