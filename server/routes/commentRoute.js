const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate')

const { createComment } = require('../controllers/commentController')

router.post('/add', authenticate,createComment)

module.exports = router;