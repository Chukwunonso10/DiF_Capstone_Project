const express = require('express')
const router = express.Router()
const { createUser, login, getAllUsers, getSingleUser, welcome, toggleFollow } = require('../controllers/authController')
const authenticate = require('../middleware/authenticate')

//register routes
router.post('/register', createUser)
router.post('/login', login)

//authenticated routes
router.get('/getall', authenticate, getAllUsers)
router.get('/getme/:identifier',authenticate, getSingleUser)
router.patch('/:id',authenticate, toggleFollow)
router.get('/', welcome)


module.exports = router;