const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); 
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name,email,password);
        

        if (!name || !password || !email) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

const loginUser = async(req,res) =>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const getProfile = async(req,res)=>{
    try {
        const {userId} = req.body
        const userData = await User.findById(userId).select('-password')
        res.json({success:true,userData})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const updateProfile = async(req,res)=>{
    try {
        const {userId,name,phone,address,dob,gender} = req.body
        const imageFile = req.file
        if(!name || !phone || !address || !dob || !gender){
            return res.json({success:false,message:"Data missing"})
        }
        await User.findByIdAndUpdate(userId,{name,phone, address:JSON.parse(address),dob,gender})
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = imageUpload.secure_url
            await User.findByIdAndUpdate(userId,{image:imageUrl})
        }
        res.json({success:true,message:"Profile updated"})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
module.exports = { registerUser,loginUser,getProfile,updateProfile };
