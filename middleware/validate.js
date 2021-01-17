const user="123";
function Validation(req,res,next) {
    if(req.body.username===user)
    {
        next();
        return;
    }
    res.send("Invalid user");
}

module.exports = Validation;