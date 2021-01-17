const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
    ELECTION_ID: Number,
    ELECTION_TITLE: String,
    DESIGNATION: String,
    POLL_SDATE: Date,
    POLL_EDATE: Date,
    NOM_SDATE: Date,
    NOM_EDATE: Date,
    BIO_VERIFY: Boolean,
    OWNER_ID: Number,
    STATUS: Boolean
});

const Election = mongoose.model('Election', electionSchema);

module.exports = Election;