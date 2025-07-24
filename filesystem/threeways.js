//promise api
const fs = require("fs/promises");

(async () => {
  try {
    await fs.copyFile("filename", "copied=promise.txt");
  } catch (error) {
    console.log(error);
  }
})();

//callback api
const fs = require("fs");
fs.copyFile("filename", "copied-callback.txt", (error) => {
  if (error) console.log(error);
});

//sync api
const fs = require("fs");
fs.copyFileSync("filename", "copied-sync.txt");
