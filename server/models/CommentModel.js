const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {type: String, required: true, trim: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    post: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    parentComment: {type: mongoose.Schema.Types.ObjectId, ref: "comment"},
},{ timestamps: true})

commentSchema.index({ post: 1, createdAt: -1 })

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment;