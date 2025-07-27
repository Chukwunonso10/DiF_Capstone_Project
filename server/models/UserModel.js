const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true},
    fullName: {type: String, required: true, unique: true},
    userName: {type: String, required:true, unique: true},
    profilePicture: {type: String, required:true, default: ""},
    bio: {type: String},
    
}, {timestamps: true})

const User = mongoose.model("User", userSchema)
module.exports = User;