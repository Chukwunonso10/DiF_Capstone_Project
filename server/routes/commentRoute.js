const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')

const { createComment, getAllComment } = require('../controllers/commentController')

router.post('/add', authenticate,createComment)
router.get('/', authenticate, getAllComment)

module.exports = router;