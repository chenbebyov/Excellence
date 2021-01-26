const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Student = new Schema(
    {
        email: { type:String, pattern:"^([_A-Za-z0-9-.]*@([A-Za-z0-9-]*)+((\\.com)|(\\.co.il)|(\\.net))$)", required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        cellPhone: { type: String, required: false },
        city: { type: String, required: false },
        bornDate: { type: Date, required: false },
        groupCode: { type: Number, required: false },
        attendance: {
            type:[{
                date: { type: Date, required: true },
                present:{ type: Boolean, required: true }
            }],
            required: false
        }, 
        taskSubmission: {
            type:[{
               taskCodeStudent: { type: Number, required: true },
               linkToFile: { type: String, required: true },
               dateSubmission: { type: Date, required: true }
            }],
            required: false
        }, 
        borrowingBooks: {
            type:[{
                codeBorrowe: { type: Number, required: true },
                booksCode: { type: String, required: true },
                dateBorrowe: { type: Date, required: true },
                endDateBorrowing: { type: Date, required: true }
            }],
            required: false
        }, 
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

module.exports = mongoose.model('students', Student)
 

