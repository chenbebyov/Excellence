const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
    {
        userCode: {pattern:"^([_A-Za-z0-9-.]*@([A-Za-z0-9-]*)+((\\.com)|(\\.co.il)|(\\.net))$)", required: true },
        userName: { type: String, required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('users', User)
