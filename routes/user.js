const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/usercontroller");


router.get("/", usercontroller.index);
router.get("/getusers", usercontroller.getUsers);
router.post("/getuser", usercontroller.getUserById);
router.post("/adduser", usercontroller.addUser);
router.post("/removeuser", usercontroller.deleteUserById);
module.exports = router;