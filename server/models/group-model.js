const mongoose = require('mongoose')
const ObjectId = require('mongoose/lib/types/objectid')
const Schema = mongoose.Schema

const Group = new Schema(
    {
        name: { type: String, required: false },
        teacherCode: { type: String, required: false, ref:"staff" },
        lessons: {
            type: [{
                lessonId: { type: ObjectId, required: true, ref:"lessons" },
                fromDateTime: { type: Date, required: true },
                toDateTime: { type: Date, required: true },
                comments: { type: String, required: false },
            }],
            required: false
        },
        StudentsInTheGroup: {
            type: [{
                studentCode: { type: ObjectId, required: true, ref:"students" },
            }],
            required: false
        },
    },
    { timestamps: true },
)

module.exports = mongoose.model('groups', Group)



