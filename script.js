const express = require("express");
const adminrouter = require("./routes/admin");
const userrouter = require("./routes/user");
const cors = require("cors");
const { json } = require("express");
const validate = require("./middleware/validate");
const app = express();
const md5 = require("md5");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));
app.use('/admin', adminrouter);
app.use('/user', userrouter);

app.get("/", (req, res) => {
    res.send("Home");
});

app.post("/login", validate, (req, res) => {
    const a = req.body.username;
    res.send(a);
});
app.get("/signup", (req, res) => {
    res.send("Signup");
});


const PORT = process.env.PORT || '3001';
app.listen(PORT, () => {
    console.log("Server Running on " + PORT);
})