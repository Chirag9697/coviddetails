const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Profile = require("../models/userProfile")

router.post("/profile",async(req,res)=>{
    const {fullName, lastName,address, phone,gender,dob,email} = req.body
    try{
        const newUserProfile = new Profile({fullName, lastName,address, phone,gender,dob,email});
        if(newUserProfile){
            res.json(newUserProfile)
        }
    }catch(err){
        console.log(err)
    }
})

module.exports = router