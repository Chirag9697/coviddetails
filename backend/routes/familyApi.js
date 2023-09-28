const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const Family = mongoose.model('family')
const nodemailer=require('nodemailer'); 
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
router.get('/confirminvitation/:sender/:receiver',(req,res)=>{
    const{sender,receiver}=req.params;
    // console.log('')
    res.send("invitation accepted");
})
router.post('/send-mail',async(req,res)=>{
    const{sender,receiver}=req.body;
    console.log(sender);
    let mailtransporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"chirru.ra@gmail.com",
            pass:"poay zigc neav rhsw"

        }
    })
    const url=`http://localhost:5000/confirminvitation/${sender}/${receiver}`
    let details={
        from:"chirru.ra@gmail.com",
        to:"chirag.ranasaria764@gmail.com",
        subject:"testing our api",
        html:`<h1>hello<h1/><button>cancel<button/><button><a href="${url}">accept</a></button>`
    }
    mailtransporter.sendMail(details,(err)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("mail is sent");
        }
            
        
        // console.log("email sent");

    })
    // res.send("sending mails");
})

module.exports = router

