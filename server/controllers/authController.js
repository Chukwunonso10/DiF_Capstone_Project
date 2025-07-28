const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//CREATE CRUD 
const createUser = async (req, res)=>{
    try {
        const { email, phoneNumber, userName, fullName, password } = req.body
        if ((!email.trim() && !phoneNumber.trim()) || !userName.trim() || !fullName || !password.trim()) return res.status(500).json({ message: "All fields are required "})
        
        const isExist = await User.findOne({$or: [{ email }, { phoneNumber }]})
        if (isExist) return res.status(409).json({ message: "User already exists, log in"})
        
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({
            email: email || phoneNumber,
            userName: userName,
            fullName: fullName,
            password: hashed

        })

        if (!user) return res.status(500).json({ message: "An Error occurred while creating user "})
        const token = jwt.sign({userId: user._id, email:user.email}, process.env.JWT_SECRETE, {expiresIn: "1hr"})
        res.status(201).json({
            message: "User successfully Created", 
            token, 
            user: {
                _id: user._id,
                email: user.email,
                userName: user.userName,
                fullName: user.fullName
            }
        })
        
    
    } catch (error) {
        console.error("error creating account", error.message)
        res.status(500).json({ sucess: false})
    }
    
} 