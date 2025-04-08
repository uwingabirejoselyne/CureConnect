import validator from 'validator'

const registerUser = async(req,res)=>{
    try {
        const{name,email,password} = req.body
        if(!name || !password || !email){
            return res.json({success:false, message:"Missing Details"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid message"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"Enter a strong password"})

        }
    } catch (error) {
        
    }
}