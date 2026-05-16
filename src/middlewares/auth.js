const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

const adminAuth = (req, res, next) => {
    let token = 'abcd';
    let isAuth = token === 'abcd';
    if (!isAuth) {
        res.status(401).send("Unauthorized");
    }
    else {
        next();
    }
}

const auth = async (req, res, next) => {
    try {
        const cookie = req.cookies;
        let { token } = cookie;
        if(!token){
            throw new Error("Token Expired..!!")
        }
        const decodedMsg = await jwt.verify(token, "Token@123");
        const userDetail = await User.findOne({ _id: decodedMsg._id });
        if(!userDetail){
            throw new Error("User is not found")
        }
        req.userDetail = userDetail;
        next();
    }
    catch (err) {
        res.status(400).send("ERROR: "+err.message);
    }

}

module.exports = { adminAuth, auth };