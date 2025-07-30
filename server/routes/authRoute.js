const express = require('express')
const router = express.Router()
const { createUser, login, getAllUsers, getSingleUser } = require('../controllers/authController')


//register routes
router.post('/register', createUser)
router.post('/login', login)


module.exports = router;