const md5 = require("md5");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    USER_ID: {
        type: Number,
        required: true
    },
    USER_NAME: {
        type: String,
        required: true
    },
    PASSWORD: {
        type: String,
        required: true
    },
    USER_TYPE: {
        type: Number,
        default: 2
    },
    STATUS: {
        type: Boolean,
        default: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;