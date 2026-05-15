const { Timestamp } = require("bson");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
        trim: true
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        lowercase: true,
        enum: {
            values: ["male", "female", "others"],
            message: "{VALUE} is not a valid gender"
        }
    },
    skills: {
        type: [String],
        validate(value) {
            console.log(value);
            if (value.includes("sleeping")) {
                throw new Error("Skills cannot contain 'sleeping'");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://kristalle.com/team/david-and-audrey-lloyd/dummy-profile-pic/"
    },
    bio: {
        type: String,
        default: "This is the default bio tag..!!"
    }
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

module.exports = { User };