const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const { connectDb } = require("./config/database");
const { User } = require("./models/users");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validations");

const app = express();

app.use(express.json());

// app.post('/signup', async (req,res)=>{
//     try{
//         const user = new User({
//             'firstName': 'Abhi',
//             'lastName': 'Mohata',
//             'age': 30,
//             'gender': 'Male'
//         })
//         await user.save();
//         res.send("Data submitted to DB successfully..!!")
//     }
//     catch(err){
//         res.status(400).send("OOPs..API not found.");
//     }
// })

//Signup API
app.post('/signup', async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, emailId, password } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });
        await user.save();
        res.send("Data send successfully saved for: " + firstName);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

//login api
app.post("/login", async (req,res)=>{
    try{
        const {emailId,password} = req.body;
        const findEmail = await User.findOne({emailId: emailId});
        if(!findEmail){
            throw new Error("Invalid Crendentials..!!")
        }
        const isValidPassword = await bcrypt.compare(password,findEmail.password);
        if(!isValidPassword){
            throw new Error("Invalid Crendentials..!!")
        }
        else{
            res.send("Logged in successfull for - "+ emailId);
        }
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

//search from mail id
app.post('/fetchUser', async (req, res) => {
    const email = req.body.emailId;
    try {
        const data = await User.find({ emailId: email });
        if (data.length === 0) {
            res.send("No Email found..!!")
        }
        else {
            res.send(data);
        }

    }
    catch (err) {
        res.status(400).send("Something went wrong..!!");
    }
})

//Feed Api - get all the users
app.get('/feed', async (req, res) => {
    try {
        const data = await User.find({});
        res.send(data)
    }
    catch (err) {
        res.status(400).send("Something went wrong..!!");
    }
})

//Delete By Id 
app.delete('/deleteUser', async (req, res) => {
    const userId = req.body.userId;
    try {
        // await User.findByIdAndDelete({_id:userId}); //same
        await User.findByIdAndDelete(userId);
        res.send("Deleted Successfully..!!");
    }
    catch (err) {
        res.status(400).send("Something went wrong..!!");
    }
})

//update by Id
app.patch('/updateUser', async (req, res) => {
    const { userId, ...updateData } = req.body;
    try {
        const allowed_update = ['firstName', 'lastName', 'password', 'skills', 'photoUrl', 'bio'];
        const requestedUpdate = Object.keys(updateData);
        const isAllowed = requestedUpdate.every((field) => allowed_update.includes(field));
        if (!isAllowed) {
            return res.status(400).send("Invalid updates!");
        }
        await User.findByIdAndUpdate(userId, updateData, { runValidators: true });
        res.send("Updated Successfully..!!")
    }
    catch (err) {
        res.status(400).send("Something went wrong..!!" + err.message);
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