const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LessonAndTask = new Schema(
    {
        lessonSubject: { type: String, required: true },
        lesson: {
            type:[{
               linkToLesson: { type: String, required: true },
               lessonName: { type: String, required: true }
            }],
            required: true
       }, 
        taskToLesson: {
             type:[{
                linkToTask: { type: String, required: true },
                taskName: { type: String, required: true }
             }],
             required: false
        },  
    },    
    { timestamps: true },
)

module.exports = mongoose.model('lessonsAndTasks', LessonAndTask)


