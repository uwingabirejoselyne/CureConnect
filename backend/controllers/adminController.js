const validator = require('validator');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const doctorModel = require('../models/doctorModel');

const addDoctor = async (req, res) => {
    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const image = req.file;

        // ✅ Check required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || fees === undefined || !address || !image) {
                console.log("Missing Field(s):", { name, email, password, speciality, degree, experience, about, fees, address, image: req.file })
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        // ✅ Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // ✅ Validate password length
        if (password.length < 5) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" });
        }

        // ✅ Hash password BEFORE using it in doctorData
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Upload image BEFORE using it in doctorData
        const imageUpload = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
        const imageurl = imageUpload.secure_url;

        // ✅ Create doctor object AFTER hashing password & uploading image
        const doctorData = {
            name,
            email,
            image: imageurl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees: Number(fees), // Ensure fees is a number
            address: JSON.parse(address), // Convert address from string to object
            date: Date.now()
        };

        // ✅ Save to database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(201).json({ success: true, message: "Doctor added successfully", data: newDoctor });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ success: false, message: "Error adding doctor", error: error.message });
    }
};

module.exports = { addDoctor };
