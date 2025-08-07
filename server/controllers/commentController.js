const Comment = require("../models/CommentModel")
const Post = require("../models/PostModels") // Needed to check if post exists

// CREATE A NEW COMMENT (TOP-LEVEL OR REPLY)
const createComment = async (req, res) => {
    try {
        const { postId, content, parentCommentId } = req.body
        const user = req.user

         const newcommentData = {
            content: content?.trim(),
            post: postId,
            parentComment: parentCommentId,
            user: user._id
        }


        if (!postId.trim() || !content?.trim()) return res.status(400).json({ message: "post ID and content are required "})

        const postExists = await Post.findById(postId)
        if (!postExists) return res.status(404).json({ message: "No post found "})
        
        if (parentCommentId){
            const parentCommentExists = await Comment.findById(parentCommentId)
            if (!parentCommentExists) return res.status(404).json({ message: "parent Comment does not exist "})

            if (parentCommentExists.post.toString() !== postId.toString()) {
                res.status(400).json({ message: "reply must be to the same post as the parent comment"})
            }

            newcommentData.parentComment = parentCommentId
          }
        const newComment = Comment.create(newcommentData)
        if (!newComment) return res.status(500).json({ message: "Error creating comment"+ error.message})

        const populatedComment = await Comment.findById(newComment._id)
                                  .populate("user", "userName fullName profilePicture")
                                  .populate("post", "content media tags")
                                  .populate("parentComment", "user media")
            res.status(201).json({ success: true, message: "comment created successfully", populatedComment: populatedComment})
            

    } catch (error) {
        console.error("comment create error: " + error.message)
        res.status(500).json({ message: "internal server error "})
    }
  }

const getAllComment = async (req, res)=>{
  const { page=1, limit=5 } = req.query
  const skip = (parseInt(page) - 1) * parseInt(limit)

  
    try {
        const comments = await Comment.find()
                        .populate("user", "userName fullName profilePicture bio")
                        .populate("post", "content media")
                        .skip(skip)
                        .limit(parseInt(limit))
        const total = await Comment.countDocuments()             
        if (comments.length == 0) return res.status(200).json({ success: true, message: "No Comment Found", pagination: {pages: 0, total, page:0}, comment: []})
        
        res.status(200).json({ success: true, message: "Comment successfully fetched",pagination: {pages: Math.ceil(total/parseInt(limit))}, total, page, comment: comments })
    } catch (error) {
        console.error(" Fetch comment Error: " + error.message )
        res.status(500).json({ message: "internal server error "})
    }

}

const getCommentByPost = async (req,res) =>{
  const postId = req.params.id
  let { page=1, limit=5 } = req.query
  page = parseInt(page)
  limit = parseInt(limit)

  const skip = (page - 1) * limit
  try {
    const postExist = await Post.findById(postId)
    if (!postExist) return res.status(404).json({ message: "Post ID Not Found!! "})
    
    const comment = await Comment.find({ post: postId, parentComment: {$exists: false}})
                              .populate("user", "userName fullName ProfilePicture")
                              .sort({ createdAt: 1})
                              .skip(skip)
                              .limit(limit)
    
    if (!comment) return res.status(404).json({ success: false, message: "No Comment Found "})
    const total = await Comment.countDocuments({ post: postId, parentComment: {$exists: false}})
    //fetch the replies
    
    const commentsWithReplies = []
    for (const comments of comment){
      const replies = await Comment.find({ parentComment: comments._id})
                              .populate("user", "userName fullName profilePicture")
                              .sort({ createdAt: 1})

      commentsWithReplies.push({
        ...comments.toObject(), replies
      })
    }

    res.status(200).json({
      success: true, 
      message: "successfull",
      comment: commentsWithReplies,
      pagination: {
        page: page,
        total:total,
        limit: limit,
        pages: Math.ceil(total / limit) 
      }
    })


  } catch (error) {
    console.error("Get comment Error: " + error.message )
    res.status(500).json({ message: "internal server error "})
  }
}

const updateComment = async(req, res) => {
  const { commentId, postId } = req.params
  const { content } = req.body
  const user = req.user
  try {

    if (!content?.trim()) return res.status(400).json({ message: "content is required!!"})
    
    const ExistingComment = await Comment.findById(commentId)
    if (!ExistingComment) return res.status(404).json({ message: "Comment Not Found "})

    if (ExistingComment.user.toString() !== user._id.toString()) return res.status(401).json({ message: "you can only update your own comment "})
    ExistingComment.content = content
    await ExistingComment.save()

    const updatedComment = await Comment.findById(ExistingComment._id)
                                      .populate("user", "userName fullName profilePicture")
    res.status(200).json({ success: true, message: "successfully updated comment", comment: updatedComment})


  } catch (error) {
    console.error("Error updating comment: " + error.message)
    res.status(500).json({ message: "internal server error "})
  }

  
}

// const deleteComment = async (req, res) =>{
  
// }


//   try {
//     const { postId, content, parentCommentId } = req.body
//     const user = req.user // Authenticated user from middleware

//     if (!postId || !content?.trim()) {
//       return res.status(400).json({ message: "Post ID and content are required" })
//     }

//     // Check if the post exists
//     const postExists = await Post.findById(postId)
//     if (!postExists) {
//       return res.status(404).json({ message: "Post not found" })
//     }

//     const newCommentData = {
//       content: content.trim(),
//       userId: user._id,
//       post: postId,
//     }

//     // If it's a reply, link to the parent comment
//     if (parentCommentId) {
//       const parentCommentExists = await Comment.findById(parentCommentId)
//       if (!parentCommentExists) {
//         return res.status(404).json({ message: "Parent comment not found" })
//       }
//       // Ensure the reply is for the same post as the parent comment
//       if (parentCommentExists.post.toString() !== postId) {
//         return res.status(400).json({ message: "Reply must belong to the same post as the parent comment" })
//       }
//       newCommentData.parentComment = parentCommentId
//     }

//     const newComment = await Comment.create(newCommentData)

//     // Populate user data for the response
//     const populatedComment = await Comment.findById(newComment._id)
//       .populate("user", "fullName userName profilePicture")
//       .populate("parentComment", "content user") // Populate parent comment content and user

//     res.status(201).json({
//       success: true,
//       message: "Comment created successfully",
//       comment: populatedComment,
//     })
//   } catch (error) {
//     console.error("Create comment error:", error.message)
//     res.status(500).json({ message: "Internal server error" })
//   }


// GET COMMENTS FOR A SPECIFIC POST
// const getCommentsByPost = async (req, res) => {
//   try {
//     const { postId } = req.params
//     const { page = 1, limit = 20 } = req.query
//     const skip = (page - 1) * limit

//     // Check if the post exists
//     const postExists = await Post.findById(postId)
//     if (!postExists) {
//       return res.status(404).json({ message: "Post not found" })
//     }

//     // Find top-level comments (no parentComment)
//     const comments = await Comment.find({ post: postId, parentComment: { $exists: false } })
//                                     .populate("user", "fullName userName profilePicture")
//                                     .sort({ createdAt: -1 })
//                                     .skip(skip)
//                                     .limit(Number.parseInt(limit))

//     const totalComments = await Comment.countDocuments({ post: postId, parentComment: { $exists: false } })

//     // For each top-level comment, find its direct replies
//     const commentsWithReplies = await Promise.all(
//       comments.map(async (comment) => {
//         const replies = await Comment.find({ parentComment: comment._id })
//           .populate("user", "fullName userName profilePicture")
//           .sort({ createdAt: 1 }) // Sort replies chronologically
//         return { ...comment.toObject(), replies }
//       }),
//     )

//     res.status(200).json({
//       success: true,
//       comments: commentsWithReplies,
//       pagination: {
//         page: Number.parseInt(page),
//         limit: Number.parseInt(limit),
//         total: totalComments,
//         pages: Math.ceil(totalComments / limit),
//       },
//     })
//   } catch (error) {
//     console.error("Get comments by post error:", error.message)
//     res.status(500).json({ message: "Internal server error" })
//   }
// }

// // GET A SINGLE COMMENT BY ID
// const getCommentById = async (req, res) => {
//   try {
//     const { commentId } = req.params

//     const comment = await Comment.findById(commentId)
//       .populate("user", "fullName userName profilePicture")
//       .populate("post", "media content") // Populate basic post info
//       .populate("parentComment", "content user") // Populate parent comment info

//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" })
//     }

//     // Also fetch replies to this specific comment
//     const replies = await Comment.find({ parentComment: commentId })
//       .populate("user", "fullName userName profilePicture")
//       .sort({ createdAt: 1 })

//     res.status(200).json({
//       success: true,
//       comment: { ...comment.toObject(), replies },
//     })
//   } catch (error) {
//     console.error("Get single comment error:", error.message)
//     res.status(500).json({ message: "Internal server error" })
//   }
// }

// UPDATE A COMMENT
// const updateComment = async (req, res) => {
//   try {
//     const { commentId } = req.params
//     const { content } = req.body
//     const user = req.user

//     if (!content?.trim()) {
//       return res.status(400).json({ message: "Comment content is required" })
//     }

//     const existingComment = await Comment.findById(commentId)
//     if (!existingComment) {
//       return res.status(404).json({ message: "Comment not found" })
//     }

//     // Only the comment owner can update it
//     if (existingComment.user.toString() !== user._id.toString()) {
//       return res.status(403).json({ message: "You can only update your own comments" })
//     }

//     existingComment.content = content.trim()
//     await existingComment.save()

//     const updatedComment = await Comment.findById(existingComment._id)
//       .populate("user", "fullName userName profilePicture")
//       .populate("parentComment", "content user")

//     res.status(200).json({
//       success: true,
//       message: "Comment updated successfully",
//       comment: updatedComment,
//     })
//   } catch (error) {
//     console.error("Update comment error:", error.message)
//     res.status(500).json({ message: "Internal server error" })
//   }
// }

// DELETE A COMMENT
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params
    const user = req.user

    const existingComment = await Comment.findById(commentId)
    if (!existingComment) {
      return res.status(404).json({ message: "Comment not found" })
    }

    // Only the comment owner can delete it
    if (existingComment.user.toString() !== user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own comments" })
    }

    // If this comment has replies, decide how to handle them (e.g., delete them too, or set their parentComment to null)
    // For simplicity, we'll delete replies for now. 
    await Comment.deleteMany({ parentComment: commentId })  

    const deletedComment = await Comment.findByIdAndDelete(commentId)  

    if (!deletedComment) {
      return res.status(500).json({ message: "Unable to delete comment" })
    }

    res.status(200).json({
      success: true,
      message: "Comment and its replies successfully deleted",
    })
  } catch (error) {
    console.error("Delete comment error:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  createComment,
  getAllComment,
  getCommentByPost,
  updateComment
}
