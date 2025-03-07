const express = require('express');
const upload = require('../middlewares/multer');
const { addDoctor } = require('../controllers/adminController');

const adminRouter = express.Router();

adminRouter.post('/add-doctor', upload.single('image'), addDoctor);

module.exports = adminRouter;
