const express = require("express");
const ElectionController = require("../controller/electioncontroller");
const router = express.Router();
const usercontroller = require("../controller/usercontroller");


router.get("/", usercontroller.index);
router.get("/getusers", usercontroller.getUsers);
router.post("/getuser", usercontroller.getUserById);
router.post("/adduser", usercontroller.addUser);
router.post("/removeuser", usercontroller.deleteUserById);
router.post("/updateuser", usercontroller.updateUser);
router.post("/getElection", ElectionController.getElectionByUser);
router.post("/createElection", ElectionController.createElectionPlan);
router.post("/updateElection", ElectionController.updateElectionPlan);

module.exports = router;