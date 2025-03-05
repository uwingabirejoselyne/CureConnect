const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDb = require('./config/mongodb');
const cloudinary = require('./config/cloudinary')


const app = express()
const port = process.env.PORT || 4000
connectDb()
cloudinary()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Api working")
})

app.listen(port, ()=>console.log("Server started",port))