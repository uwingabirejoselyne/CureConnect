const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotTime: { type: String, required: true },
    SlotDate: { type: String, required: true}, 
    userData: {type:Object, required: true},
    DocData: {type:Object, required: true},
    amount: {type: String, required: true},
    date: {type: String, required: true},
    date: {type: String, required: true},
    cancelled: {type: Boalean,default: false},
    payment: {type: Boalean,default: false},
    isCompleted: {type: Boalean,default: false}
    

}, { timestamps: true });

const Appointment = mongoose.model('User', appointmentSchema);

module.exports = Appointment;