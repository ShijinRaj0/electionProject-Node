const { request } = require("express");
const usermodel=require("../model/usermodel");
const sql= require('mssql');
const dbconfig=require('../db');

exports.index= (req,res)=>{
    connect= sql.connect(dbconfig,(err)=>{
        var request = new sql.Request();
       request.query("SELECT * FROM TB_USER",(err,recordset)=>{
            result= recordset.recordset;
            res.json(result);
            console.log(result);
            sql.close();
            return;
        }
        );
    });
    //res.send("result");
}

exports.createPlan= (req,res,next)=>{
    res.send(usermodel.createPlan);
    next();
}

