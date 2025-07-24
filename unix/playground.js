const { spawn, exec } = require("child_process");
const { stdin, stdout, stderr } = require("process");

stdin.on("data", (data) => {
  //console.log by default is writing to stdout and stderr with new line at the end
  console.log("Got this data from stdin", data);
  console.log(data.toString("utf-8"));
});
// stdout.write("This is some text I want \n");
// stderr.write("This is some text I may not want \n");

//enviornment variables
// console.log(process.env.PATH);
// console.log(process.argv);
// console.log(process.pid);
// console.log(process.ppid);
// console.log(process.env.foo);

// //spawning a process
// const subprocess = spawn("bash", ["./script.sh"]);

// subprocess.stdout.on("data", (chunk) => {
//   console.log(chunk.toString("utf-8"));
// });

// exec(" echo 'Nita is a cat' | tr ' ' '\n'", (error, stdout, stderr) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   console.log(stdout);

//   console.log(`stderr:${stderr}`);
// });
