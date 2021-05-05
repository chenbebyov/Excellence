const Book = require('../models/book-model')
const Student= require('../models/student-model')
const { ObjectId } = require('mongodb');

async function createBook(req, res){
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a book',
        })
    }

    let existBook = await Book.findOne({barcode: body.barcode});
    
    if(existBook) {
        return res.status(500).json({
            message: 'barcode already exist',
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

    try {
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

        book.status = 'borrowed';
        await book.save();

        const newBorrow = {bookId: book._id,  endDateBorrowing: endDate};
        student.borrowingBooks.push(newBorrow);


        student.save();
        return res.status(200).json({
            success: true,
            borrow: newBorrow,
            message: 'borrow created!',
        })
    }
    catch(error) {
        return res.status(500).json({
            error,
            message: 'borrow not created!',
        })
    }
}

async function returnBorrow(req, res) {

    try {
        const body = req.body;
        const {studentId, bookId, borrowId} = body;

        if (!body || !studentId ||  !bookId || !borrowId) {
            return res.status(400).json({
                success: false,
                error: 'You must provide parameters',
            })
        }
        
        let student = await Student.findById(studentId);
        let book = await Book.findById(bookId);

        book.status = 'not borrowed';
        await book.save();

        let borrow = student.borrowingBooks.find(borrow => borrow._id.toString() === borrowId);
        borrow.isReturned =  true;
        student.save();

        return res.status(200).json({
            success: true,
            borrow: borrow,
            message: 'borrow created!',
        })
    }
    catch(error) {
        return res.status(500).json({
            error,
            message: 'borrow not created!',
        })
    }
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

    try {

        let borrowsResult = [];
        const students = await Student.find({}).populate('borrowingBooks.bookId').exec();;
    
        students.forEach(student => {
            if(student.borrowingBooks) {
                let borrows = student.borrowingBooks.map(item => {
                    let {name, writer, barcode} = item.bookId.toObject();
                    let {bookId, ...borrow} = item.toObject();
                    return ({
                        ...borrow,
                        bookName: name,
                        writer,
                        barcode,
                        studentName : `${student.firstName} ${student.lastName}`,
                        studentId: student._id,
                        bookId: bookId._id,
                    })
                })
                borrowsResult.push(...borrows);
            }
        })
        return res.status(200).json({ success: true, data: borrowsResult })
    }
    catch(error) {
        return res.status(500).json({
            error,
            message: 'failed to retrive borrows',
        })
    }

}

module.exports = {
    createBook,
    updateBook,
    deleteBook,
    getBooks,
    getBookById,
    createBorrow,
    getBorrows,
    returnBorrow
}