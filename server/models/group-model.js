const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Group = new Schema(
    {
        groupName: { type: String, required: true },
        teacherCode: { type: int, required: true },
        NumberOfStudentsInTheGroup: { type: int, maximum:12 ,required: true },
        LevelOfLearning: { type: int, enum:['level a','level b','level c'],required: true,default:'level a' },
        lessonDayOfTheWeek: { type: String, enum:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday night'], required: true, default:'Sunday'},
        fromAnHour: { type: date, required: true },
        toAnHour: { type: date, required: true },
        lesson: {
            type:[{
                lessonCode: { type: int, required: true },
                lessonDate: { type: date, required: true },
                remarks: { type: String, required: true }
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



