//very imp

const fs = require("fs");

console.log("start");

setTimeout(() => {
  console.log("timeout 1");

  Promise.resolve().then(() => {
    console.log("promise inside timeout");
  });

}, 0);

setImmediate(() => {
  console.log("immediate 1");

  process.nextTick(() => {
    console.log("nextTick inside immediate");
  });
});

Promise.resolve().then(() => {
  console.log("promise 1");

  process.nextTick(() => {
    console.log("nextTick inside promise");
  });

  Promise.resolve().then(() => {
    console.log("promise inside new");
  });
});

process.nextTick(() => {
  console.log("nextTick 1");

  Promise.resolve().then(() => {
    console.log("promise inside nextTick");
  });

  process.nextTick(() => {
    console.log("nextTick inside new");
  });
});

fs.readFile(__filename, () => {
  console.log("file read");
});

console.log("end");