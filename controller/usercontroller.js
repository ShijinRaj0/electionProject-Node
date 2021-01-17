const mongoose = require("mongoose");
const user = require("../model/usermodel");
const election = require("../model/electionmodel");
const { connection_string } = require("../dbconfig");

mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Mongo Connected');
});

exports.index = (req, res) => {


    //Get the default connection

    //Bind connection to error event (to get notification of connection errors)
    election.find({}, (err, result) => {
        if (err) throw error;

        user.find({ USER_ID: result[0].OWNER_ID }, (err, data) => {
            if (err) throw error;
            res.send(`Election -${result[0].ELECTION_TITLE} and OWNER - ${data[0].USER_NAME} `);
        });
    });
}
exports.createPlan = (req, res, next) => {
    res.send(usermodel.createPlan);
    next();
}