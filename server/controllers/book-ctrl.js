const Book = require('../models/book-model')
const Student= require('../models/student-model')
const { ObjectId } = require('mongodb');

createBook = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a book',
        })
    }

    const book = new Book(body)

    if (!book) {
        return res.status(400).json({ success: false, error: err })
    }

    book
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                book: book,
                message: 'Book created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Book not created!',
            })
        })
}

async function createBorrow(req, res) {

    const body = req.body;
    const {barcode, endDate, studentId} = body;

    if (!body || !barcode ||  !endDate || !studentId) {
        return res.status(400).json({
            success: false,
            error: 'You must provide parameters',
        })
    }

    
    let student = await Student.findById(studentId);
    let book = await Book.findOne({barcode: barcode});

    const newBorrow = {bookId: book._id,  endDateBorrowing: endDate};
    student.borrowingBooks.push(newBorrow);


    student
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                borrow: borrow,
                message: 'A new borrow created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'A new borrow not created!',
            })
        })
}

updateBook = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Book.findOne({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Book not found!',
            })
        }
        book.name = body.name
        book.time = body.time
        book.rating = body.rating
        book
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: book._id,
                    message: 'Book updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Book not updated!',
                })
            })
    })
}

deleteBook = async (req, res) => {
    await Book.findOneAndDelete({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!book) {
            return res
                .status(404)
                .json({ success: false, error: `Book not found` })
        }

        return res.status(200).json({ success: true, data: book })
    }).catch(err => console.log(err))
}

getBookById = async (req, res) => {
    await Book.findOne({ _id: req.params.id }, (err, book) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!book) {
            return res
                .status(404)
                .json({ success: false, error: `Book not found` })
        }
        return res.status(200).json({ success: true, data: book })
    }).catch(err => console.log(err))
}

getBooks = async (req, res) => {
    await Book.find({}, (err, books) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!books.length) {
            return res
                .status(404)
                .json({ success: false, error: `Book not found` })
        }
        return res.status(200).json({ success: true, data: books })
    }).catch(err => console.log(err))
}

getBorrows = async (req, res) => {
    await Student.find({}, (err, borrowingBooks) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!borrowingBooks.length) {
            return res
                .status(404)
                .json({ success: false, error: `not found` })
        }
        return res.status(200).json({ success: true, data: borrowingBooks })
    }).catch(err => console.log(err))
}

module.exports = {
    createBook,
    updateBook,
    deleteBook,
    getBooks,
    getBookById,
    createBorrow,
    getBorrows
}