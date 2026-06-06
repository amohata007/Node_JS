const mongoose = require("mongoose");
const { URL_NEW } = require("../../Practice/secret");

const connectDb = async () => {
    await mongoose.connect(URL_NEW);
}

module.exports = { connectDb };