const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    pwd: String,
    email: { type: String, unique: true },
    role: String,
    avatar: String
});

userSchema.plugin(mongooseUniqueValidator);

const user = mongoose.model("User", userSchema);

module.exports = user;