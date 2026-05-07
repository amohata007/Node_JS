const fs = require("fs");
const https = require("https");

console.log("Hello World");

var a = 123454;
var b = 456789;

// https.get('https://jsonplaceholder.typicode.com/users/1', (res,err)=>{
//     console.log(res.name);
// });

async function main() {

    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');

    const data = await res.json();

    console.log(data.name);
}

main();

setTimeout(()=>{
    console.log("This is setTimeOut Function")
},5000);

fs.readFile('./file.txt','utf-8',(err,res)=>{
    console.log(res);
})

function multiplication(a,b){
    return a*b;
}

console.log(multiplication(a,b));

console.log("Bye World");