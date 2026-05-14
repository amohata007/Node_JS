const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const { connectDb } = require("./config/database");
const { User } = require("./models/users");

const app = express();

app.post('/signup', async (req,res)=>{
    try{
        const user = new User({
            'firstName': 'Abhi',
            'lastName': 'Mohata',
            'age': 30,
            'gender': 'Male'
        })
        await user.save();
        res.send("Data submitted to DB successfully..!!")
    }
    catch(err){
        res.status(400).send("OOPs..API not found.");
    }
})

connectDb()
    .then(() => {
        console.log("Database connection established succcessfully..!!");
        app.listen(3000, () => {
            console.log("Server listening at port 3000");
        })
    })
    .catch((err) => {
        console.error("Database cannot be established..!!");
    })

// app.use('/admin',adminAuth)

// app.get('/admin/getData',(req,res)=>{
//     res.send("Got all the data");
// })

// app.delete('/admin/deleteData',(req,res)=>{
//     res.send("Deleted Successfully");
// })

// app.get('/next', (req, res, next) => {
//     // res.send("First block");
//     next();
//     console.log("First");
// }, (req, res) => {
//     res.send("Second block");
//     console.log("Second");
// })

// app.get("/user/:id/:name", (req, res) => {
//     // console.log(req.query); //http://localhost:3000/user?userId=1&pass=testing //"/user"
//     console.log(req.params); //http://localhost:3000/user/1/hello
//     res.send({
//         "firstName": "Abhi",
//         "lastName": "Mohata"
//     })
// })

// app.post("/user", (req, res) => {
//     res.send("Data successfully submitted to DB.")
// })

// app.delete("/user", (req, res) => {
//     res.send("Deleted Successfully.")
// })

// app.use("/test", (req, res) => {
//     res.send("Hello from the test");
// })

// app.use('/', (req, res) => {
//     res.send("Hello from the server global");
// })