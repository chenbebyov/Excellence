const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Staff = new Schema(
    {
        workerCode: { type: String, required: true },
        workerName: { type: String, required: true },
        password: { type: String, required: true },
        cellPhone: { type: String, required: true },
        city: { type: String, required: true },
        role: { type: String, enum:['administr','teacher','secretary'], required: true, default:'administr' },
        messages: {
            type:[{
                codeMessage: { type: int, required: true },
                messageSubject: { type: String, required: true },
                detailsOfTheMessage: { type: String, required: true },
                dateMessage: { type: date, required: true }
            }],
            required: false
       }, 
    },
    { timestamps: true },
)

module.exports = mongoose.model('staffs', Staff)

