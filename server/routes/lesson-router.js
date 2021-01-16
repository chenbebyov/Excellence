const express = require('express');

const lessonCtrl = require('../controllers/lesson-ctrl');

const router = express.Router();

router.post('/lesson', lessonCtrl.createLesson);
router.get('/lessons', lessonCtrl.getLessons);

module.exports = router;