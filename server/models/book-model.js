const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book = new Schema(
    {
        bookCode: { type: String, required: true },
        bookName: { type: String, required: true },
        writerName: { type: String, required: true },
        status: { type: String, enum:['not borrowed','borrowed','in binding'], required: true, default:'not borrowed' },
    },
    { timestamps: true },
)

module.exports = mongoose.model('books', Book)