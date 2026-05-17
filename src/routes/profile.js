const express = require("express");
const { auth } = require("../middlewares/auth");
const profileRoute = express.Router();

profileRoute.get("/profile",auth, async (req,res)=>{
    try{
        res.send(req.userDetail);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = {profileRoute};