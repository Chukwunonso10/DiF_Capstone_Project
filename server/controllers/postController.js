const Post = require('../models/PostModels')

const createPost = async (req,res)=>{
  try {
        const { content, media, tags } = req.body
        if (!media?.trim()) return res.status(400).json({ message: "Media fields is required "})
        const user = req.user
        const newPost = await Post.create({
            userId: user._id,
            media,
            content,
            tags
    })

        if (!newPost) return res.status(500).json({success: false, message: "Error creating post "})

        res.status(201).json({ success: true, message: "New post successfully created "})
  } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: error.stack})
  }

}

const getAllPost = async (req, res) =>{
    try {
        const { page=1, limit=5, search } = req.query
        const skip = (page - 1) * limit
        let filter = {};
        if (search) {
            filter = {
                $or: [ {tags: {$regex: search, $options: "i" }}, {content: {$regex: search, $options: "i"}}]
            }
        }
        const posts = await Post.find(filter)
                        .skip(parseInt(skip))
                        .limit(parseInt(limit))
                        .sort({createdAt: -1})
                        .populate("userId","fullName userName profilePicture")
        const total = await Post.countDocuments(filter)     
        if (posts.length == 0)return res.status(200).json({ message: "No available posts", posts:[], pagination:{page, limit, total, pages:0 }})

        res.status(200).json({success: true, posts: posts, pagination:{ 
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total/parseInt(limit))
        }})

    }catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, message: " internal Server Error "})
    }

}

const getSinglePost = async (req, res)=>{
    try {
        const { id } = req.params
        const post = await Post.findById(id)
                        .populate("userId", "fullName userName profilePicture")
                        

        if (!post) return res.status(404).json({ message: "Post not found"})
    
    res.status(200).json({ success: true, post: post})
    } catch (error) {
        console.error("An error has occured: ",error.message)
        res.status(500).json({ message: "internal server error "})
    }
}

const updatePost = async (req, res)=>{
   try {
    const { id } = req.params
    const user = req.user

    //check if post exists and belongs to a user
    const postIsExists = await Post.findById(id)
    if (!postIsExists) return res.status(404).json({ success: false, message: "Post not found "})
    
    if (postIsExists.userId.toString() !== user._id.toString()) return res.status(403).json({ message: "you can only update your own posts"})

    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
                    .populate("userId", "fullName userName profilePicture")
    if (!updatedPost) return res.status(500).json({ message: "update failed"})
    
    res.status(200).json({ success: true, post: updatedPost,})
   } catch (error) {
    console.error("Error updating Post:" + error.message)
    res.status(500).json({message: "Error updating post try again!!!"})
   }

}

const deletePost = async (req, res) =>{
    const { id } = req.params
    const user = req.user

    try {
        const postIsExists = await Post.findById(id)
        if (!postIsExists) return res.status(404).json({success: true, message: "Post Not Found "})

        if (postIsExists.userId.toString() !== user._id.toString()) return res.status(403).json({ success: false, message: "you can only delete your own post"})
    
        const deletedPost = await Post.findByIdAndDelete(id, req.body, {new: true})
        if (!deletedPost) return res.status(500).json({ message: "unable to delete post "})

        res.status(200).json({success: true, message: "successfully deleted"} )
    } catch (error) {
       console.error("Delete post Error: " + error.message )
       res.status(500).json({ success: false, message: "internal Server Error "}) 
    }
    
}

const toggleLike = async (req, res) =>{
  try {
        const { id } = req.params
        const user = req.user

        const post = await Post.findById(id)
        if (!post) return res.status(404).json({ message: "post not found "})

        const likedpost = post.likes.includes(user._id)
        if (likedpost){  //if already liked
            post.likes = post.likes.filter(id => id.toString() !== user._id.toString())
    }else{
        post.likes.push(user._id)
    }
        post.save()

        res.status(200).json({
            success: true,
            message: likedpost ? "post unliked" : "post liked",
            likedCount: post.likes.length,
            likedpost: !likedpost
            
    })
  } catch (error) {
        console.error("unable to like post: " + error.message)
        res.status(500).json({ message: "internal server Error "})
  }
}


module.exports = {
    createPost,
    getAllPost,
    getSinglePost,
    updatePost,
    deletePost,
    toggleLike
}