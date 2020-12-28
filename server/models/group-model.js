const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Group = new Schema(
    {
        groupName: { type: String, required: true },
        teacherCode: { type: int, required: true },
        LevelOfLearning: { type: int, enum:['level a','level b','level c'],required: true,default:'level a' },
        timeLesson: {
            type:[{
                date: { type: date, required: true },
                fromAnHour: { type: date, required: true },
                toAnHour: { type: date, required: true },
            }],
            required: true
       },
        lesson: {
            type:[{
                Code: { type: int, required: true },
                remarks: { type: String, required: false }
            }],
            required: true
       }, 
        StudentsInTheGroup: {
            type:[{
                studentCode: { type: int, required: true },
            }],
            required: true
       },    
    },    
    { timestamps: true },
)

module.exports = mongoose.model('groups', Group)



