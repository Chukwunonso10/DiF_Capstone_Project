const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')

//import routes
const authRoute = require('./routes/authRoute')
const postRoute = require('./routes/postRoute')
const commentRoute = require('./routes/commentRoute')



dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comment',commentRoute)



app.listen(process.env.PORT, ()=>{
    console.log(`server is connected on port ${process.env.PORT}`)
})