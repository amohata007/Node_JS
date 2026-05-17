const express = require("express");
const { auth } = require("../middlewares/auth");
const requestRoute = express.Router();

//connection request
requestRoute.post("/connectionRequest",auth, async (req,res)=>{
    try{
        const {firstName, lastName} = req.userDetail;
        res.send(firstName+" "+lastName+" send the connection request");
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = {requestRoute};