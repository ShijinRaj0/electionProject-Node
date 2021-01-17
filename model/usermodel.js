const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    USER_ID: Number,
    USER_NAME: String,
    PASSWORD: String,
    USER_TYPE: Number,
    STATUS: Boolean
});

const User = mongoose.model('User', userSchema);

module.exports = User;