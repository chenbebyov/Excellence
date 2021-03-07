const express = require('express');

const GroupCtrl = require('../controllers/group-ctrl');

const router = express.Router();

router.put('/group', GroupCtrl.updateGroup);
router.put('/group/lessons', GroupCtrl.updateGroupLessons);


module.exports = router;