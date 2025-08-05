const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')

const authenticate = async (req, res, next)=>{
   try {
     const auth = req.headers.authorization
     if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ message: "No token found "})
     
     const token = auth.split(" ")[1]
     const decoded = jwt.verify(token, process.env.JWT_SECRET)
     const user = await User.findOne({ _id: decoded.userId}).select("-password")

     if (!user) return res.status(401).json({ message: "User not found "})

     req.user = user
     next()
   } catch (error) {
    console.error(error.message)
    res.status(401).json({ message: "unauthorized"})
    
   }
}

module.exports = authenticate;