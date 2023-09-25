const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const Family = mongoose.model('family')

//Family Group Management

router.post("/families/create",async(req,res)=>{
    const {groupName,members, email} = req.body;
    try{
        const newFamily = new Family({groupName, members, email});
        await newFamily.save();
        res.status(201).json(newFamily)
    }catch(err){
        console.log(err)
    }

})

//retrieve the list of user's family group
router.get('/families',async(req,res)=>{
    try{
        const {groupName} = req.body
        const familyList = await Family.find({groupName})

        res.json(familyList)
    }catch(err){
        console.log(err)
    }
})

module.exports = router

