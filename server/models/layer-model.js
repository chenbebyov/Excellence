const mongoose = require('mongoose')
const ObjectId = require('mongoose/lib/types/objectid')
const Schema = mongoose.Schema

const Layer = new Schema(
    {
        name: { type: String, required: true },
        grades: {
            type: [{
                name: { type: String, required: false },
                levels: {
                    type: [{
                        name: { type: String, required: false },
                        groups: {
                            type: [{
                                teacherCode: { type: String, required: false },
                                timeLesson: {
                                    type: [{
                                        date: { type: Date, required: true },
                                        fromAnHour: { type: Date, required: true },
                                        toAnHour: { type: Date, required: true },
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
                                },
                            }], required: false
                        }

                    }],
                    required: true
                }
            }],
            required: true
        }
    },
    { timestamps: true },
)

module.exports = mongoose.model('layers', Layer)



