const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {type: String, required: true, trim: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    post: {types: mongoose.Schema.Types.ObjectId, ref: "User"},
    innerComment: {types: mongoose.Schema.Types.ObjectId, ref: "comment"},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
},{ timestamps: true})

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment;
