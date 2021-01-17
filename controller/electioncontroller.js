const mongoose = require("mongoose");
const user = require("../model/usermodel");
const election = require("../model/electionmodel");
const { connection_string } = require("../dbconfig");
const { query } = require("express");
const { count } = require("../model/usermodel");
const md5 = require("md5");
//Mongo DB Connection
mongoose.connect(connection_string, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Mongo Connected');
});
var ElectionController = {};
//Index function
ElectionController.index = (req, res) => {
    election.find({}, (err, result) => {
        if (err) throw error;

        user.find({ USER_ID: result[0].OWNER_ID }, (err, data) => {
            if (err) throw error;
            res.send(`Election -${result[0].ELECTION_TITLE} and OWNER - ${data[0].USER_NAME} `);
        });
    });
}


//Get election plans created by user.
ElectionController.getElectionByUser = (req, res) => {

    var user_id = req.body.user_id;
    if (user_id == undefined) {
        res.status(500).send("Invalid User ID");
        return;
    }
    var query = election.find({ "OWNER_ID": user_id }).select({ "_id": 0 });
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

//Create a new election plan
ElectionController.createElectionPlan = (req, res) => {
    var election_id = req.body.election_id;
    var election_title = req.body.election_title;
    var designation = req.body.designation;
    var poll_sdate = req.body.poll_sdate;
    var poll_edate = req.body.poll_edate;
    var nom_sdate = req.body.nom_sdate;
    var nom_edate = req.body.nom_edate;
    var bio_verify = req.body.bio_verify;
    var owner_id = req.body.owner_id;
    var status = req.body.status;

    if (election_id == undefined || election_title == undefined || owner_id == undefined) {
        console.log(req.body);
        res.send("Required fields missing to create a plan");
        return;
    }
    var query = election.find({ OWNER_ID: owner_id, ELECTION_ID: election_id }).select({ "ELECTION_ID": 1, "_id": 0 });
    query.exec((err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send("Plan already exists");
            return;
        }
        const new_election = new election({
            ELECTION_ID: election_id,
            ELECTION_TITLE: election_title,
            DESIGNATION: designation,
            POLL_SDATE: poll_sdate,
            POLL_EDATE: poll_edate,
            NOM_SDATE: nom_sdate,
            NOM_EDATE: nom_edate,
            BIO_VERIFY: bio_verify,
            OWNER_ID: owner_id,
            STATUS: status
        });
        new_election.save((err) => {
            if (err) throw error;
            res.send("Election schedule created successfully");
        });
    });
}

//Delete User

ElectionController.deleteElectionById = (req, res) => {
    var election_id = req.body.election_id;
    var owner_id = req.body.owner_id;
    if (owner_id == undefined || election_id == undefined) {
        res.status(500).send("Invalid Election ID");
        return;
    }
    var query = election.find({ OWNER_ID: user_id, ELECTION_ID: election_id }).select({ "ELECTION_ID": 1, "_id": 0 });
    query.exec((err, result) => {
        if (err) throw err;
        if (result.length < 1) {
            res.status(500).send(`Election ${election_id} doesn't exists`);
            return;
        }
        election.deleteOne({ OWNER_ID: user_id, ELECTION_ID: election_id }, (err) => {
            if (err) throw error;
            res.send(`Election plan ${election_id} is deleted`);
            return;
        });
    });
}

//Update User details by ID
ElectionController.updateElectionPlan = (req, res) => {
    var owner_id = req.body.owner_id;
    var election_id = req.body.election_id;
    if (owner_id == undefined || election_id == undefined) {
        res.status(500).send("Invalid Election");
        return;
    }
    var query = election.find({ OWNER_ID: owner_id, ELECTION_ID: election_id }).select({ "_id": 0 });
    query.exec((err, result) => {
        if (err) throw err;
        if (result.length < 1) {
            res.status(500).send(`Election plan ${election_id} doesn't exists`);
            return;
        }
        console.log(result);
        var existing_plan = result[0];

        var election_title = req.body.election_title ? req.body.election_title : existing_plan.ELECTION_TITLE;
        var designation = req.body.designation ? req.body.designation : existing_plan.DESIGNATION;
        var poll_sdate = req.body.poll_sdate;
        var poll_edate = req.body.poll_edate;
        var nom_sdate = req.body.nom_sdate;
        var nom_edate = req.body.nom_edate;
        var bio_verify = req.body.bio_verify ? req.body.bio_verify : existing_plan.BIO_VERIFY;
        var status = req.body.status ? req.body.status : existing_plan.STATUS;

        poll_sdate = poll_sdate ? ISODate(poll_sdate) : existing_plan.POLL_SDATE;
        poll_edate = poll_edate ? ISODate(poll_edate) : existing_plan.POLL_EDATE;
        nom_sdate = nom_sdate ? ISODate(nom_sdate) : existing_plan.NOM_SDATE;
        nom_edate = nom_edate ? ISODate(nom_edate) : existing_plan.NOM_EDATE;

        const updated_plan = {
            ELECTION_TITLE: election_title,
            DESIGNATION: designation,
            POLL_SDATE: poll_sdate,
            POLL_EDATE: poll_edate,
            NOM_SDATE: nom_sdate,
            NOM_EDATE: nom_edate,
            BIO_VERIFY: bio_verify,
            STATUS: status
        };
        console.log(updated_plan);
        election.updateOne({ OWNER_ID: owner_id, ELECTION_ID: election_id }, updated_plan, (err, result) => {
            if (err) throw err;
            console.log(result);
            res.send(`Successfully updated election ${election_id} details`);
            return
        });

    });
}
module.exports = ElectionController;