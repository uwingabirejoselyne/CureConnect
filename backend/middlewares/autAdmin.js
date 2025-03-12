const jwt = require('jsonwebtoken')

const authAdmin = async(req,res,next)=>{
    try {
        const {atoken} = req.headers
        if(!atoken){
            return res.json({success:false,message:"Not Authorized login again"})
        }
        const token_decode = jwt.verify(atoken,process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json ({success:false, message:'Not Authorized login agin'})
        }
        next()
    } catch (error) {
        return res.json("")
    }
}

module.exports = authAdmin