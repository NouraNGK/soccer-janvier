// import mongoose module
const mongoose = require("mongoose");

// create user schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    pwd: String,
    avatar: String
});

// create Model Name "User"
const user = mongoose.model("User", userSchema);

// make match exportable
module.exports = user;