const mongoose = require("mongoose");
const user = require("../model/usermodel");
const election = require("../model/electionmodel");
const { connection_string } = require("../dbconfig");
const { query } = require("express");
const { count } = require("../model/usermodel");

//Mongo DB Connection
mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Mongo Connected');
});
var UserController = {
    index: null,
    getUsers: null,
    getUserById: null,
    addUser: null,
    deleteUserById: null
};
//Index function
UserController.index = (req, res) => {
    election.find({}, (err, result) => {
        if (err) throw error;

        user.find({ USER_ID: result[0].OWNER_ID }, (err, data) => {
            if (err) throw error;
            res.send(`Election -${result[0].ELECTION_TITLE} and OWNER - ${data[0].USER_NAME} `);
        });
    });
}

//Get all User details
UserController.getUsers = (req, res) => {
    var query = user.find({}).select({ "PASSWORD": 0, "_id": 0 });
    query.exec((err, result) => {
        if (err) throw error;
        if (result.length > 1) {
            res.send(result);
        } else {
            res.status(500).send("No data found");
        }
    });
}

//Get specific user details.
UserController.getUserById = (req, res) => {
    var user_id = req.body.user_id;
    if (user_id == undefined) {
        res.status(500).send("Invalid User ID");
        return;
    }
    var query = user.find({ "USER_ID": user_id }).select({ "PASSWORD": 0, "_id": 0 });
    query.exec((err, result) => {
        if (err) throw error;
        if (result.length > 0) {
            res.send(result);
            return;
        } else {
            res.status(500).send("No data found");
        }
    });
}

//Create a new user
UserController.addUser = (req, res) => {
    var user_id = req.body.user_id;
    var user_name = req.body.user_name;
    var password = req.body.password;
    var user_type = req.body.user_type ? req.body.user_type : 2;
    var status = req.body.status ? req.body.status : 1;
    if (user_id == undefined || user_name == undefined) {
        res.send("User ID & User Name is required to create user");
        return;
    }
    var query = user.find({ USER_ID: user_id }).select({ "USER_ID": 1, "_id": 0 });
    query.exec((err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send("User ID already exists");
            return;
        }
        const new_user = new user({
            USER_ID: user_id,
            USER_NAME: user_name,
            PASSWORD: password,
            USER_TYPE: user_type,
            STATUS: status
        });
        new_user.save((err) => {
            if (err) throw error;
            res.send("User created successfully");
        });
    });
}

//Delete User

UserController.deleteUserById = (req, res) => {
    var user_id = req.body.user_id;
    if (user_id == undefined) {
        res.status(500).send("Invalid User ID");
        return;
    }
    var query = user.find({ USER_ID: user_id }).select({ "USER_ID": 1, "_id": 0 });
    query.exec((err, result) => {
        if (err) throw err;
        if (result.length < 1) {
            res.status(500).send(`User ${user_id} doesn't exists`);
            return;
        }
        user.deleteOne({ "USER_ID": user_id }, (err) => {
            if (err) throw error;
            res.send(`User ${user_id} is deleted`);
            return;
        });
    });
}


module.exports = UserController;