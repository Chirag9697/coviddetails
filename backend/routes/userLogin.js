const express = require('express')
const router = express.Router()
const mongoose = require("mongoose");
const User = mongoose.model('user')
const {Jwt_secret} = require("../key")

router.post('/save-email', async (req, res) => {
    try {
      const { email } = req.body;
  
      // Create a new Email document
      const newUser = new User({ email });
    
      // Save the Email document to the database
      await newUser.save();
  
      res.status(201).json({ message: 'Email saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  });

  router.get('/get-user/:email', async (req, res) => {
    try {
      const { email } = req.params;
  
      // Create a new Email document
      const findUser = await User.findOne({ email });
    
      // Save the Email document to the database
      await findUser.save();
  
      res.status(201).json({ findUser });
    } catch (error) {
     
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  });

  module.exports = router