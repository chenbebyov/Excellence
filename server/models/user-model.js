const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        email: {pattern:"^([_A-Za-z0-9-.]*@([A-Za-z0-9-]*)+((\\.com)|(\\.co.il)|(\\.net))$)", required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)
