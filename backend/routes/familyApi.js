const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const Family = mongoose.model('family')
const Invite = require('../models/invite')
const nodemailer=require('nodemailer'); 
//Family Group Management

router.post("/families/create",async(req,res)=>{
    console.log("create")
    const {groupName,email,members} = req.body;
    try{
        const newFamily = new Family({groupName,email,members});
        const savefamily=await newFamily.save();
        const newinvite=new Invite({email:email,familyId:savefamily._id,owner:true});
        newinvite.save();
        res.status(201).json(newFamily)
    }catch(err){
        console.log(err)
    }

})

router.get('/families1/:id',async(req,res)=>{
    console.log("getupdate")
    const {id} = req.params;
    try {   
        const familyDetail = await Family.findById({ _id: id });
        res.json({ allfamily1: familyDetail });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})
//retrieve the list of user's family group
router.get('/families/:email',async(req,res)=>{
    console.log("get")
    const {email} = req.params;

    try {
        const familyList = await Invite.find({email: email});
       
        const allFamilyDetails = [];
        for (let i = 0; i < familyList.length; i++) {
            const familyDetail = await Family.findById({ _id: familyList[i].familyId });
            allFamilyDetails.push(familyDetail);
        }

        console.log(allFamilyDetails);
        res.json({ allfamily1: allFamilyDetails });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})
router.get('/confirminvitation/:sender/:receiver', async (req, res) => {
   const{sender,receiver}=req.params;
   try {
    const familyList = await Invite.find({email: sender});
    for (let i = 0; i < familyList.length; i++) {
        const familyDetail =new Invite({ familyId: familyList[i].familyId,email:receiver,owner:false });
        familyDetail.save();
    }
    res.send("invition accepted successfully");
   }catch(error){
    res.send("error")
   }

});//explain this code
router.post('/send-mail',async(req,res)=>{
    const{sender,receiver}=req.body;
    console.log(sender);
    let mailtransporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"ashim1998.poudyal@gmail.com",
            pass:"arup ossg moue xxme"

        },
        tls: {
            rejectUnauthorized: false // Allow self-signed certificates
          }
    })
    const url=`http://localhost:5000/confirminvitation/${sender}/${receiver}`
    let details={
        from:"ashim1998.poudyal@gmail.com",
        to:`${receiver}`,
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

//delete the data
router.delete("/deleteRoute/:id",async(req,res)=>{
    console.log("hey")
    try{
    const familyResult=await Invite.deleteMany({familyId:req.params.id})
    if(familyResult.ok === 1){
        const inviteResult=await Family.deleteOne({_id:req.params.id})
        if(inviteResult.ok===1){
            res.send(inviteResult)
        }
    }
}catch(err){
    console.log(err)
}
    
})
 
//Update Route
router.put("/families/update/:id",async(req,res)=>{
    console.log("create")
    const{id}=req.params;
    console.log(id);
    const {groupName,email,members} = req.body;
    try{
        
        const newFamily = await Family.findOneAndUpdate({_id:id},{groupName,email,members},{ new: true });
        const updatedFamilyObject = newFamily.toObject();
        res.status(201).json(updatedFamilyObject);
    }catch(err){
        console.log(err)
    }

})
module.exports = router

