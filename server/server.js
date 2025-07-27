const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())









app.listen(process.env.PORT, ()=>{
    console.log(`server is connected on port ${process.env.PORT}`)
})