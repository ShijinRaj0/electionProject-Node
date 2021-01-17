const express=require("express");
const router=express.Router();
const usercontroller= require("../controller/usercontroller");


router.get("/",usercontroller.index)

router.post("/create_plan",usercontroller.createPlan)

module.exports=router;