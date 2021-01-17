const mongoClient = require("mongodb").MongoClient;
const connection_string = "mongodb://localhost:27017/";

exports.createPlan=(req,res,next)=>{

    mongoClient.connect(connection_string, { useUnifiedTopology: true }, (err, client) => {
        if (err) throw error;
        console.log("Connected");
        var db = client.db("electiondb");
        db.collection("elections").find({}).toArray((err, data) => {
            if (err) throw error;
            res.send("Success");
            mongoClient.close();
        });
    });
}


module.exports = mongoClient;