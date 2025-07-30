const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next)=>{
   try {
     const auth = req.header.authorization
     if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "No token found "})
     
     const token = auth.split(" ")[1]
     const decoded = jwt.verify(token, JWT_SECRETE)
     const user = await User.findOne({ _id: decoded.userId})
     req.user = user
     next()
   } catch (error) {
    res.status(401).json({ message: "unauthorized"})
    console.error(error.message)
   }
}