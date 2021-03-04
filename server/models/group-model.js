const mongoose = require('mongoose')
const ObjectId = require('mongoose/lib/types/objectid')
const Schema = mongoose.Schema

const Group = new Schema(
    {
        name: { type: String, required: false },
        teacherCode: { type: String, required: false },
        timeLesson: {
            type: [{
                date: { type: Date, required: true },
                fromAnHour: { type: Date, required: true },
                toAnHour: { type: Date, required: true },
                comments: { type: String, required: false },
            }],
            required: false
        },
        lesson: {
            type: [{
                Code: { type: ObjectId, required: true },
                remarks: { type: String, required: false },
                date: { type: Date, required: true }
            }],
            required: false
        },
        StudentsInTheGroup: {
            type: [{
                studentCode: { type: ObjectId, required: true },
            }],
            required: false
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('groups', Group);


