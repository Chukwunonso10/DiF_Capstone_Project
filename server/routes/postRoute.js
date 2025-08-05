const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')

//importing all controllers
const { createPost, getAllPost, getSinglePost, updatePost, deletePost, toggleLike } = require('../controllers/postController')



router.get('/all', getAllPost)
router.get('/me/:id', getSinglePost)

//protected routes
router.post('/add', authenticate, createPost)
router.put('/:id', authenticate, updatePost)
router.delete('/:id', authenticate, deletePost)
router.patch('/:id/like', authenticate, toggleLike)


module.exports = router;