const express = require('express');
const {registerUser, loginUser, getProfile,updateProfile, bookingAppointment } = require('../controllers/userController');
const authUser = require('../middlewares/authUser');
const upload = require('../middlewares/multer')

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile',authUser, getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser, bookingAppointment)


module.exports = userRouter;
