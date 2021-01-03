const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Staff = new Schema(
    {
        email: { type:String, pattern:"^([_A-Za-z0-9-.]*@([A-Za-z0-9-]*)+((\\.com)|(\\.co.il)|(\\.net))$)", required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        cellPhone: { type: String, required: true },
        city: { type: String, required: true },
        role: { type: String, enum:['administr','teacher','secretary'], required: true, default:'administr' },
        messages: {
            type:[{
                Subject: { type: String, required: true },
                detailsOfTheMessage: { type: String, required: true },
                dateMessage: { type: Date, required: true }
            }],
            required: false
       }, 
    },
    { timestamps: true },
)

module.exports = mongoose.model('staff', Staff)

