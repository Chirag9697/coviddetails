const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    googleId: { type: String }, // If using Google authentication
    username: { type: String, required: true },
    email: { type: String, required: true },
})

const user = mongoose.model("user", userSchema)

module.exports = user;