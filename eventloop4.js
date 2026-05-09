const fs = require("fs");

console.log("start");

setTimeout(() => {
  console.log("timeout 1");

  process.nextTick(() => {
    console.log("nextTick inside timeout");
  });

  Promise.resolve().then(() => {
    console.log("promise inside timeout");
  });

}, 0);

setImmediate(() => {
  console.log("immediate 1");

  process.nextTick(() => {
    console.log("nextTick inside immediate");
  });

  Promise.resolve().then(() => {
    console.log("promise inside immediate");
  });

});

process.nextTick(() => {
  console.log("nextTick 1");

  setTimeout(() => {
    console.log("timeout inside nextTick");
  }, 0);

  Promise.resolve().then(() => {
    console.log("promise inside nextTick");
  });
});

Promise.resolve().then(() => {
  console.log("promise 1");

  process.nextTick(() => {
    console.log("nextTick inside promise");
  });

  setImmediate(() => {
    console.log("immediate inside promise");
  });

});

fs.readFile(__filename, () => {
  console.log("file read");

  process.nextTick(() => {
    console.log("nextTick inside I/O");
  });

  Promise.resolve().then(() => {
    console.log("promise inside I/O");
  });
});

console.log("end");