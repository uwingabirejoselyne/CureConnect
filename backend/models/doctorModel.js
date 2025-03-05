const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true }, // Store Cloudinary URL or local path
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: {type: Boolean, required: true},
    fees: { type: Number, required: true },
    address: {type:Object,require: true},
    date: { type: Number, required: true },
    slots_booked: {type:Object,default:{}},
}, { timestamps: true });

module.exports = mongoose.model('Doctor', DoctorSchema);