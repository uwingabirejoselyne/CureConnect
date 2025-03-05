const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDb = require('./config/mongodb');


const app = express()
const port = process.env.PORT || 4000
connectDb()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Api working")
})

app.listen(port, ()=>console.log("Server started",port))