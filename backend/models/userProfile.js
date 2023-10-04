const mongoose = require("mongoose")

const userProfileSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number },
    gender: { type: String },
    dob: { type: String, required: true },
    email: { type: String, required: true },
})

const userProfile = mongoose.model("userProfile", userProfileSchema)

module.exports = userProfile;