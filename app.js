const {x,calculate} = require("./xyz.js"); 
const {multiply,sum} = require("./Calculate")

console.log("hi");
let a = 10;
let b = 40;

//var x = 50; --> will give error as x we are already exporting from xyz file
console.log(x);
console.log(calculate(a,b));
console.log(multiply(a,b));
console.log(sum(a,b));
console.log("First Code of Node JS");