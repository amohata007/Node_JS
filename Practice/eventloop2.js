
const fs = require("fs");
const a = 100;

setImmediate(() => console.log("setImmediate"));

Promise.resolve("Promise").then(value => console.log(value));

fs.readFile("./file.txt", "utf8", () => {
  console.log("File Reading CB");
});

setTimeout(() => console.log("Timer expired"), 500);

process.nextTick(() => console.log("process.nextTick"));

function printA() {
  console.log("a=", a);
}

printA();
console.log("Last line of the file.");