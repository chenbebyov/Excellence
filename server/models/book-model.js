const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book = new Schema(
    {
        barcode: { type: String, required: true },
        name: { type: String, required: true },
        writer: { type: String, required: true },
        status: { type: String, enum:['not borrowed','borrowed','in binding'], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('books', Book)