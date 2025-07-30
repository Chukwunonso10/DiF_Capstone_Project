const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, sparse:true},
    phoneNumber: {type: String, unique: true, sparse:true},
    password: {type: String, required: true},
    fullName: {type: String, required: true},
    userName: {type: String, required:true, unique: true},
    profilePicture: {type: String, default: ""},
    bio: {type: String},
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
    
}, {timestamps: true})

const User = mongoose.model("User", userSchema)
module.exports = User;
