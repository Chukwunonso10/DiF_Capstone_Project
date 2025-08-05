const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  content: {type: String, trim: true},
  media: {type: String, required: true},
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  savedBy: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  tags: [{type: String, trim:true}],
}, { timestamps: true });


const Post = mongoose.model('Post', postSchema);
module.exports = Post;

