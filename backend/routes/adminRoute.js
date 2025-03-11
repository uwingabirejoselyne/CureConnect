const express = require('express');
const upload = require('../middlewares/multer');
const { addDoctor, loginAdmin } = require('../controllers/adminController');

const adminRouter = express.Router();

adminRouter.post('/add-doctor', upload.single('image'), addDoctor);
adminRouter.post('/login',loginAdmin)

module.exports = adminRouter;
