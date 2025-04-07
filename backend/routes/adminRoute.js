const express = require('express');
const upload = require('../middlewares/multer');
const { addDoctor, loginAdmin, allDoctors } = require('../controllers/adminController');
const authAdmin = require('../middlewares/autAdmin');
const { changeAvailability } = require('../controllers/doctorController');

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin  ,upload.single('image'), addDoctor);
adminRouter.post('/login',loginAdmin)
adminRouter.get('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)


module.exports = adminRouter;
