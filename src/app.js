const express = require("express")

const app = express();

app.use("/test",(req,res)=>{
    res.send("Hello from the test");
})

app.use('/',(req,res)=>{
    res.send("Hello from the server global");
})

app.listen(3000,()=>{
    console.log("Server listening at port 3000");
})