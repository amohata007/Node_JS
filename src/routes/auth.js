const express = require("express");
const { validateSignUpData } = require("../utils/validations");
const authRoute = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const jwt = require("jsonwebtoken");

//Signup API
authRoute.post('/signup', async (req, res) => {
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
authRoute.post("/login", async (req,res)=>{
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
            const token = await jwt.sign({_id:findEmail._id},"Token@123",
                {expiresIn: '1d'}
            );
            res.cookie("token",token);
            res.send("Logged in successfull for - "+ emailId);
        }
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = {authRoute};