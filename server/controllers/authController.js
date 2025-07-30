const User = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 

//CREATE CRUD 
const createUser = async (req, res)=>{
    try {
        const { email, phoneNumber, userName, fullName, password } = req.body
        if ((!email && !phoneNumber) || !userName.trim() || !fullName.trim() || !password.trim()) return res.status(500).json({ message: "All fields are required "})
        
        const isExist = await User.findOne({$or: [{ email }, { phoneNumber }, { userName }]})
        if (isExist) return res.status(409).json({ message: "User already exists, log in"})
        
            
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({
            email: email ? email : undefined,
            phoneNumber: phoneNumber ? phoneNumber : undefined,
            userName: userName,
            fullName: fullName,
            password: hashed

        })

        if (!user) return res.status(404).json({ message: "An Error occurred while creating user "})
        const token = jwt.sign({userId: user._id, email:user.email}, process.env.JWT_SECRET, {expiresIn: "1hr"})
        res.status(201).json({
            message: "User successfully Created", 
            token, 
            user: {
                _id: user._id,
                email: email ? user.email : undefined,
                userName: user.userName,
                fullName: user.fullName,
                phoneNumber: phoneNumber ? user.phoneNumber : undefined
            }
        })
        
    
    } catch (error) {
        console.error("error creating account", error.message)
        res.status(500).json({ sucess: false})
    }
    
} 

//login controller
const login = async(req, res) =>{
    const { email, phoneNumber, password } = req.body
    if ((!email && !phoneNumber) || !password ) return res.status(500).json({ message: "All fields are required "})
    
    const user = await User.findOne({ $or: [{ email }, { phoneNumber }]})
    if (!user) return res.status(404).json({ message: "user does not exists "})
    
    const isMatch = await bcrypt.compare(password,user.password )
    if (!isMatch) return res.status(409).json({ message: "passwords doesnt match "})
    
    const token = jwt.sign({userId: user._id, email: email}, process.env.JWT_SECRET, {expiresIn: "1hr"})
    res.status(200).json({
        message: "successfully logged in",
        token,
        user:{
            _id: user._id,
            email: user.email,
            userName: user.userName,
            fullName: user.fullName
        }
    })
 }


 //CRUD: GET ALL USERS

 const getAllUsers = async (req, res) =>{
    const users = await User.find()
    if (users.length == 0) return res.status(200).json({ message: "No current user list"})
    
    res.status(200).json({ sucess: true, users})
    
 }

 //CRUD: GET A SINGLE USER
 const getSingleUser = async (req, res)=>{
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "user not found"})

    res.status(200).json(user)

 }

 //CRUD: FOLLOW AND UNFOLLOW A USER
 const togglefollower = async (req, res) =>{
    try {
        const { id } = req.body
        const loggedUser = req.user

        const user = await User.findById(id)
        if (!user) return res.status(404).json({ message: "user Not found"})
        
        
        const followers = user.followers.includes(newUser._id)
        
    }catch (error) {
        console.error( "An error has occured: " + error.message)
    }
 }
 


 module.exports = {
    createUser,
    login,
    getAllUsers,
    getSingleUser
 }