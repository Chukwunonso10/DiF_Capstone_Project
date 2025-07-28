const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({
    media: {type: String, required:true},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    expiresAt: {type: Date }
}, { timestamps: true})

const Story = mongoose.model("Story", storySchema)
module.exports = Story;
