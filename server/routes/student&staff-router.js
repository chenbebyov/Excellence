const express = require('express');

const StudentAndStaffCtrl = require('../controllers/student&staff-ctrl');

const router = express.Router();

router.post('/staff', StudentAndStaffCtrl.createStaff);
router.post('/student',StudentAndStaffCtrl.createStudent);
router.get('/student', StudentAndStaffCtrl.getStudent);
router.get('/staff', StudentAndStaffCtrl.getStaff);

module.exports = router;