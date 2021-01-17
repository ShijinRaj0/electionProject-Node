const express = require("express");
const app = express();
const adminrouter = require("./routes/admin");
const userrouter = require("./routes/user");
const cors = require("cors");
const { json } = require("express");
const validate = require("./middleware/validate");

app.use(cors());
app.use(express.json());
app.use('/admin', adminrouter);
app.use('/user', userrouter);
app.use(express.static("views"));
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