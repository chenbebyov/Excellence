const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Lesson = new Schema(
    {
        lessonSubject: { type: String, required: true },
        filesToLesson: {
            type: [{
                linkToFile: { type: String, required: true },
                fileName: { type: String, required: true }
            }],
            required: true
        },
        taskToLesson: {
            type: [{
                linkToTask: { type: String, required: true },
                taskName: { type: String, required: true }
            }],
            required: false
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model('lessons', Lesson)


