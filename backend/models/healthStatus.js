const mongoose = require('mongoose');
const user = require('./user');
const {ObjectId} = mongoose.Schema.Types

const healthSchema = new mongoose.Schema({
    covidDetails:{type: String},
    vaccineStatus:{type: String},

})

const health = mongoose.model("health", familySchema)

module.exports = health
