const Lesson = require('../models/lesson-model');
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const Layers = require('../models/layer-model');

createLesson = async (req, res) => {

    try {
        const body = req.body;
    
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'Failed to create lesson, details are empty.',
            })
        }
    
        const {lesson, levelsIds} = body;
    
        const newLesson = new Lesson(lesson);
    
        if (!newLesson) {
            return res.status(400).json({ success: false, error: err })
        }
    
        await newLesson.save();

        let query = {'grades.levels._id': { "$in": levelsIds }};
        let newLessonOfLevel = {lessonId: newLesson._id};

        await Layers.updateMany(
            query, 
            { '$addToSet': { 'grades.$.levels.$[i].lessonOfLevel': newLessonOfLevel } }, 
            { arrayFilters: [{ "i._id": { "$in": levelsIds } } ]},
        );        

        return res.status(200).json({
            success: true,
            lesson: newLesson,
            message: 'Lesson And Task created!',
        })
    }
    catch(error){
        return res.status(400).json({
            error,
            message: 'Lesson And Task not created!',
        })
    }
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