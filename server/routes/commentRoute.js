const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')

const { createComment, getAllComment, getCommentByPost, updateComment } = require('../controllers/commentController')

router.post('/add', authenticate,createComment)
router.get('/', authenticate, getAllComment)
router.get('/:id', authenticate, getCommentByPost)
router.put('/commentId', authenticate, updateComment)

module.exports = router;