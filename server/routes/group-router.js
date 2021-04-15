const express = require('express');

const {
    updateGroup, 
    updateGroupLessons, 
    getLessons,
    getUserGroups
} = require('../controllers/group-ctrl');

const router = express.Router();

router.put('/group', updateGroup);
router.put('/group/lessons', updateGroupLessons);
router.get('/groups/lessons/:groupId/:userId/:getAll', getLessons);
router.get('/groups/:userId', getUserGroups);


module.exports = router;


