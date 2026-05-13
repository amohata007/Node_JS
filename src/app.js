const express = require("express")

const app = express();

app.get('/next',(req,res,next)=>{
    // res.send("First block");
    next();
    console.log("First");
},(req,res)=>{
    res.send("Second block");
    console.log("Second");
})

app.get("/user/:id/:name",(req,res)=>{
    // console.log(req.query); //http://localhost:3000/user?userId=1&pass=testing //"/user"
    console.log(req.params); //http://localhost:3000/user/1/hello 
    res.send({
        "firstName": "Abhi",
        "lastName": "Mohata"
    })
})

app.post("/user",(req,res)=>{
    res.send("Data successfully submitted to DB.")
})

app.delete("/user",(req,res)=>{
    res.send("Deleted Successfully.")
})

app.use("/test",(req,res)=>{
    res.send("Hello from the test");
})

app.use('/',(req,res)=>{
    res.send("Hello from the server global");
})

app.listen(3000,()=>{
    console.log("Server listening at port 3000");
})