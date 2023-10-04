const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Profile = require("../models/userProfile")

router.post("/profile",async(req,res)=>{
    const {firstName, lastName,address, phone,gender,dob,email} = req.body
    try{
        const newUserProfile = new Profile({firstName, lastName,address, phone,gender,dob,email});

       await newUserProfile.save()
        if(newUserProfile){
            res.json(newUserProfile)
        }
    }catch(err){
        console.log(err)
    }
})

// Get profile route
router.get("/get-profile/:email", async (req, res) => {
    const { email } = req.params;
  console.log("Get Profile Route Called");

    try {
      const profileDetail = await Profile.findOne({email:email});
  
      if (!profileDetail) {
        return res.status(404).json({ message: "Profile not found" });
      }
      console.log(profileDetail)
      res.json({ profileDetail });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  

   

router.put("/edit-profile/:id", async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const updatedProfile = await Profile.findByIdAndUpdate(
        id,
        updatedData,
        { new: true }
      );
  
      if (!updatedProfile) {
        return res.status(404).json({ message: "Profile not found" });
      }
  
      res.json({ profile: updatedProfile });
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  
  
module.exports = router