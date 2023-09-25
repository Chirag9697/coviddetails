const mongoose = require('mongoose');
const user = require('./user');
const {ObjectId} = mongoose.Schema.Types

const familySchema = new mongoose.Schema({
   groupName:{type: String, required: true},
   email: {type: ObjectId, ref:user},
   members: [
      {
         name: { type: String, required: true },
         age: { type: Number },
         address: { type: String },
         covidStatus: { type: String, required: true },
      }
   ]

})

const family = mongoose.model("family", familySchema)

module.exports = family
