const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number },
    gender: { type: String },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
})

const user = mongoose.model("user", userSchema)

module.exports = user;