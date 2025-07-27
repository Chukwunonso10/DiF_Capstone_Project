const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    receiver: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    post: {type: mongoose.Schema.Types.ObjectId, ref: "Post"},
    read: {type: Boolean, default: false},
    type: {type: String, enum: ["like", "follow", "comment", "message"]}
    

})

const Notification = mongoose.model("Notification", notificationSchema)
module.exports = Notification;