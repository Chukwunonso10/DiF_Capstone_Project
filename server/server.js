const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')

//import routes
const authRoute = require('./routes/authRoute')


dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({
    origin: '*'
}))


app.use('/api/auth', authRoute)
// app.use('/',(req, res)=>{
//     res.status(200).send("Hello welcome to our page")
// })



app.listen(process.env.PORT, ()=>{
    console.log(`server is connected on port ${process.env.PORT}`)
})