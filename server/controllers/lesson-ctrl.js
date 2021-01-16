const Lesson = require('../models/lesson-model');
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

createLesson = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Failed to create lesson, details are empty.',
        })
    }

    const lesson = new Lesson(body);

    if (!lesson) {
        return res.status(400).json({ success: false, error: err })
    }

    lesson.save().then(() => {
        return res.status(200).json({
                success: true,
                lesson: lesson,
                message: 'Lesson And Task created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Lesson And Task not created!',
        })
    })
}

getLessons = async (req, res) => {
    // console.log(req);
    await Lesson.find({}, (err, lesson) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!lesson.length) {
            return res
                .status(404)
                .json({ success: false, error: `There is no lessons` })
        }
        return res.status(200).json({ success: true, data: lesson })
    }).catch(err => console.log(err))
}

module.exports = {
    createLesson,
    getLessons
}