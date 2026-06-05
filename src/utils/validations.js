const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName || !emailId || !password) {
        throw new Error("Please enter required fields");
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Password is not strong")
    }
}

const validateProfileData = (req) => {
    const allowedUpdates = ["firstName", "lastName", "skills", "bio", "gender", "age", "photoUrl"];
    const keys = Object.keys(req.body);
    const isAllowed = keys.every((field) => allowedUpdates.includes(field));
    if (!isAllowed) {
        throw new Error("Invalid fields..!!");
    }
}

const validatePassword = (req) => {
    const { newPassword, retypePassword } = req.body;
    if (!validator.isStrongPassword(newPassword) || !validator.isStrongPassword(retypePassword)) {
        throw new Error("Please enter strong password..!!")
    }
}

module.exports = { validateSignUpData, validateProfileData, validatePassword }