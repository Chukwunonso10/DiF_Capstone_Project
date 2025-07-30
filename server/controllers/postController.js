const Post = require('../models/PostModels')

const createPost = async (req,res)=>{
  try {
        const { content, media, tags } = req.body
        if (!media.trim()) return res.status(500).json({ message: "Media fields is required "})
        const user = req.user
        const newPost = await Post.create({
            userId: user._id,
            media,
            content,
            tags
    })

        if (!newPost) return res.status(500).json({sucess: false, message: "Error creating post "})
        res.status(201).json({ sucess: true, message: "new post successfully created "})
  } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: error.stack})
  }

}

const getAllPost = async (req, res) =>{
    try {
        const posts = await Post.find()
                        .populate("user","fullName userName bio likes")
                
        if (posts.length == 0)return res.status(404).json({ message: "No available post"})
        res.status(200).json({sucess: true})
    }catch (error) {
        console.error(error.message)
        res.status(500).json({ sucess: false})
    }

}

const getSinglePost = async (req, res)=>{
    try {
        const { id } = req.params
        const post = await Post.findById(id)
        if (!post) return res.status(400).json({ message: "Post not found"})
    
    res.status(200).json({ sucess: true})
    } catch (error) {
        console.error("An error has occured: ",error.message)
    }
}

const updatePost = async (req, res)=>{
   try {
    const { id } = req.params
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    if (!updatedPost) return res.status(500).json({ message: "update failed"})
    
    res.status(200).json({ sucess: true, updatedPost})
   } catch (error) {
    console.error("Error updating Post:" + error.message)
    res.status(500).json({message: "Error updating post try again!!!"})
   }

}

const deletePost = async (req, res) =>{
    const { id } = req.params
    const deletedPost = await Post.findByIdAndDelete(id, req.body, {new: true})
    if (!deletedPost) return res.status(500).json({ message: "unable to delete post "})

    res.status(200).json({sucess: true, message: "sucessfully deleted"} )
    
    
}

const togglelike = async () =>{
  try {
        const { id } = req.params
        const user = req.user

        const post = await Post.findById(id)
        if (!post) return res.status(404).json({ message: "post not found "})

        const likedpost = post.likes.includes(user._id)
        if (likedpost){  //if already liked
            post.likes.pull(user._id)  //post.like.filter(id => id.toString() !=== _id.toString())
    }else{
            post.likes.push(user._id)
    }
    post.save()
    res.status(200).json({
        sucess: true,
        message: likedpost ? "post unliked" : "post liked",
        likedCount: post.likes.length
    })
  } catch (error) {
    console.error("unable to like post: " + error.qmessage)
  }
}