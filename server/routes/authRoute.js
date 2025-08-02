const express = require('express')
const router = express.Router()
const { createUser, login, getAllUsers, getSingleUser, welcome } = require('../controllers/authController')


//register routes
router.post('/register', createUser)
router.post('/login', login)

//authenticated routes
router.get('/getall', getAllUsers)
router.get('/getme/:identifier', getSingleUser)
router.get('/', welcome)


module.exports = router;