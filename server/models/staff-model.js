const mongoose = require('mongoose')
const ObjectId = require('mongoose/lib/types/objectid')
const Schema = mongoose.Schema

const Staff = new Schema(
    {
        email: { type:String, pattern:"^([_A-Za-z0-9-.]*@([A-Za-z0-9-]*)+((\\.com)|(\\.co.il)|(\\.net))$)", required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        cellPhone: { type: String, required: false },
        city: { type: String, required: false },
        role: { type: String, enum:['admin','teacher','secretary'], required: true },
        userId : { type: ObjectId , required : true },
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
    { collection:'staff' }
)

module.exports = mongoose.model('staff', Staff)

