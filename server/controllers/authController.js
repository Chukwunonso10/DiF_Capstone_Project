const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// CREATE USER (SIGNUP)
const createUser = async (req, res) => {
  try {
    const { email, phoneNumber, userName, fullName, password } = req.body

    // Inline validation for signup
    if ((!email?.trim() && !phoneNumber?.trim()) || !userName?.trim() || !fullName?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (email?.trim() && phoneNumber?.trim()) {
      return res.status(400).json({ message: "Provide either email or phone number, not both" })
    }

    // Validate email format if provided
    if (email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" })
    }

    // Validate phone format if provided
    if (phoneNumber && !/^\+?[\d\s-()]+$/.test(phoneNumber)) {
      return res.status(400).json({ message: "Please enter a valid phone number" })
    }

    // Validate username
    if (userName.length < 3 || userName.length > 30) {
      return res.status(400).json({ message: "Username must be between 3 and 30 characters" })
    }

    if (!/^[a-zA-Z0-9._]+$/.test(userName)) {
      return res.status(400).json({ message: "Username can only contain letters, numbers, dots and underscores" })
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" })
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        ...(email ? [{ email: email.toLowerCase() }] : []),
        ...(phoneNumber ? [{ phoneNumber }] : []),
        { userName: userName.toLowerCase() },
      ],
    })

    if (existingUser) {
      let message = "User already exists"
      if (existingUser.email === email?.toLowerCase()) {
        message = "Email already registered"
      } else if (existingUser.phoneNumber === phoneNumber) {
        message = "Phone number already registered"
      } else if (existingUser.userName === userName.toLowerCase()) {
        message = "Username already taken"
      }

      return res.status(409).json({ message })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const newUser = await User.create({
      email: email?.toLowerCase() || undefined,
      phoneNumber: phoneNumber || undefined,
      userName: userName.toLowerCase(),
      fullName: fullName.trim(),
      password: hashedPassword,
    })


    
    // Generate JWT token
    const token = jwt.sign({userId: newUser._id, fullName:newUser.fullName, ...(email && {email: newUser.email}), ...(phoneNumber && {phoneNumber: newUser.phoneNumber})}, JWT_SECRET, {expiresIn: "1hr"})


    // Return success response (exclude password)
    const userResponse = {
      _id: newUser._id,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      userName: newUser.userName,
      fullName: newUser.fullName,
      profilePicture: newUser.profilePicture,
      bio: newUser.bio,
      followers: newUser.followers,
      following: newUser.following,
      isVerified: newUser.isVerified,
      createdAt: newUser.createdAt,
    }

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: userResponse,
    })
  } catch (error) {
    console.error("Signup error:", error)

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = {}
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message
      })
      return res.status(400).json({ message: "Validation failed", errors })
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0]
      return res.status(409).json({ message: `${field} already exists` })
    }

    res.status(500).json({ message: "Internal server error" })
  }
}

// LOGIN USER
const login = async (req, res) => {
  try {
    const { email, phoneNumber, password } = req.body

    // Inline validation for login
    if ((!email?.trim() && !phoneNumber?.trim()) || !password?.trim()) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // Find user
    const user = await User.findOne({
      $or: [...(email ? [{ email: email.toLowerCase() }] : []), ...(phoneNumber ? [{ phoneNumber }] : [])],
    })

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        userName: user.userName,
        ...(user.email && { email: user.email }),
        ...(user.phoneNumber && { phoneNumber: user.phoneNumber }),
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    )

    // Return success response (exclude password)
    const userResponse = {
      _id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userName: user.userName,
      fullName: user.fullName,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      isVerified: user.isVerified,
    }

    res.status(200).json({
      message: "Login successful",
      token,
      user: userResponse,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  createUser,
  login,
}
