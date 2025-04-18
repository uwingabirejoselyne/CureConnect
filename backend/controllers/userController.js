const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); 
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const Doctor = require('../models/doctorModel')
const appointmentModel = require('../models/appointmentModel');
const doctorModel = require('../models/doctorModel');


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
        console.log(userData);
        
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

const bookingAppointment = async(req,res)=>{
    try {
        const {userId,docId,slotTime,slotDate} = req.body
        const docData = await Doctor.findById(docId).select('-password')
        if(docData.available){
            return res.json({success:'false',message:'Doctor not available'})
        }
        let slots_booked = docData.slots_booked
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
             return res.json({success:'false',message:'slot not available'})
            }
            else{
                slots_booked[slotDate].push(slotTime)
            }
        }
        else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await User.findById(userId).select('-password')
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:'appointment booked'})
    } catch (error) {
        
    }
}
module.exports = { registerUser,loginUser,getProfile,updateProfile,bookingAppointment };
