const validator = require('validator')
const bcrypt = require('bcrypt');

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ){
            return res.json({success:false, message:'Missing of details'})
        }
        if(!validator.isEmail(email)){
            return res.json ({success:false, message:'Please enter a valid email'})
        }
        if(password.length <5){
            res.json({success:false, message:"Please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        res.status(201).json({ message: "Doctor added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding doctor", error: error.message });
    }
};

module.exports = { addDoctor };
