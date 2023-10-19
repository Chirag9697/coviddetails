const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Jwt_secret} = require("../key")
const requireLogin = require('../middlewares/requireLogin')

router.post("/signup",(req,res)=>{
    const{fullName,lastName,email,address,password, phone} = req.body;
    if(!fullName || !lastName || !email || !address || !password || !phone){
     return res.status(422).json({error:"please add all the fields"})
    }
    User.findOne({email:email}).then((savedUser)=>{
      if(savedUser){
          return res.status(422).json({error:"User already exist"})
      }
      bcrypt.hash(password, 12).then((hashedPassword)=>{
      const user = new User({
          fullName,
          lastName,
          email,
          address,
          password:hashedPassword,
          phone
        })
        user.save()
        .then(user=>{res.json({message:"saved successfully"})})
        .catch(err=>console.log(err))
      })
  }) 
  })

  router.post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(422).json({ error: "Please add email and password" });
      }
  
      const savedUser = await User.findOne({ email: email });
  
      if (!savedUser) {
        return res.status(422).json({ error: "Invalid Email" });
      }
      const result = await bcrypt.compare(password, savedUser.password);
  
      if (result) {
        const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
        const {_id, fullName,lastName,address ,email, phone} = savedUser
         res.json({token, user:{_id,  fullName,lastName,address ,email, phone}});
         console.log({token, user:{_id,  fullName,lastName,address ,email, phone}})
      } else {
        return res.status(422).json({ error: "Invalid credentials" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server error" });
    }
  });

 



  module.exports = router