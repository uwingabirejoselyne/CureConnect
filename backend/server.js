const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDb = require('./config/mongodb');
const adminRouter = require('./routes/adminRoute');
require('./config/cloudinary');
const path = require('path');


const app = express()
const port = process.env.PORT || 4000
connectDb()

app.use(express.json()); // ✅ Parses incoming JSON data
app.use(express.urlencoded({ extended: true })); // ✅ Parses form data (optional)
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/admin',adminRouter)

app.get('/',(req,res)=>{
    res.send("Api working")
})

app.listen(port, ()=>console.log("Server started",port))