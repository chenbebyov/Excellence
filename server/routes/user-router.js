const express = require('express');

const UserCtrl = require('../controllers/user-ctrl');

const router = express.Router();

router.post('/user', UserCtrl.createUser);
router.post('/staff', UserCtrl.createStaff);
router.get('/user/:email/:password', UserCtrl.login);
router.get('/users', UserCtrl.getUsers);
router.get('/staff', UserCtrl.getStaff);

module.exports = router;