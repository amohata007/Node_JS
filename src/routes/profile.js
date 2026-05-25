const express = require("express");
const { auth } = require("../middlewares/auth");
const { validateProfileData, validatePassword } = require("../utils/validations");
const profileRoute = express.Router();
const bcrypt = require("bcrypt");

profileRoute.get("/profile/view", auth, async (req, res) => {
    try {
        res.send(req.userDetail);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

profileRoute.patch("/profile/update", auth, async (req, res) => {
    try {
        validateProfileData(req);
        const loggedInUser = req.userDetail;
        Object.keys(req.body).forEach((val) => (loggedInUser[val] = req.body[val]));
        await loggedInUser.save();
        res.send("Updated Successfully")
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

profileRoute.patch("/profile/changePassword", auth, async (req, res) => {
    try {
        validatePassword(req);
        const { newPassword, retypePassword } = req.body;
        if (newPassword != retypePassword) {
            throw new Error("Password didn't matched..!!");
        }
        else {
            const passwordHash = await bcrypt.hash(newPassword, 10);
            const loggedInUser = req.userDetail;
            loggedInUser.password = passwordHash;
            await loggedInUser.save();
            res.send("Updated Successfully")
        }
    }
    catch (err) {
        res.status(400).send(err.message);
    }
})

module.exports = { profileRoute };