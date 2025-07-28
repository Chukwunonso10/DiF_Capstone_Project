const mongoose = require('mongoose')


const connectDB = async ()=>{
  try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("MONGO_Database successfully connected")
  } catch (error) {
    console.error("connection Error :", error.message)
    process.exit(1)
    
  }
  
}

module.exports = connectDB;