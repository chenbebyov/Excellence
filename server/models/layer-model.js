const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Layer = new Schema(
    {
        name: { type: String, required: true },
        grade: {
            type: [{
                name: { type: String, required: true },
                levels: {
                    type: [{
                        name: { type: String, required: true },
                        groups: {
                            type: [{
                                teacherCode: { type: int, required: true },
                                timeLesson: {
                                    type: [{
                                        date: { type: date, required: true },
                                        fromAnHour: { type: date, required: true },
                                        toAnHour: { type: date, required: true },
                                    }],
                                    required: true
                                },
                                lesson: {
                                    type: [{
                                        Code: { type: int, required: true },
                                        remarks: { type: String, required: false },
                                        date: { type: date, required: true }
                                    }],
                                    required: true
                                },
                                StudentsInTheGroup: {
                                    type: [{
                                        studentCode: { type: int, required: true },
                                    }],
                                    required: true
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



