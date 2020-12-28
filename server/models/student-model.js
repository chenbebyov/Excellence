const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Student = new Schema(
    {
        email: {pattern:"^([_A-Za-z0-9-.]*@([A-Za-z0-9-]*)+((\\.com)|(\\.co.il)|(\\.net))$)", required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        cellPhone: { type: String, required: true },
        city: { type: String, required: true },
        bornDate: { type: date, required: true },
        groupCode: { type: int, required: true },
        attendance: {
            type:[{
                date: { type: date, required: true },
                present:{ type: Boolean, required: true }
            }],
            required: true
        }, 
        taskSubmission: {
            type:[{
               taskCodeStudent: { type: int, required: true },
               linkToFile: { type: String, required: true },
               dateSubmission: { type: date, required: true }
            }],
            required: true
        }, 
        borrowingBooks: {
            type:[{
                codeBorrowe: { type: int, required: true },
                booksCode: { type: String, required: true },
                dateBorrowe: { type: date, required: true },
                endDateBorrowing: { type: date, required: true }
            }],
            required: true
        }, 
        messages: {
            type:[{
                Subject: { type: String, required: true },
                detailsOfTheMessage: { type: String, required: true },
                dateMessage: { type: date, required: true }
            }],
            required: false
        }, 
    },
    { timestamps: true },
)

module.exports = mongoose.model('students', Student)
 

