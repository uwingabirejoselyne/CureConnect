const jwt = require('jsonwebtoken')

const authUser = async(req,res,next)=>{
    try {
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:"Not Authorized login again"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        return res.json("")
    }
}

module.exports = authUser