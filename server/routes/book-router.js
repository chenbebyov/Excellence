const express = require('express');

const BookCtrl = require('../controllers/book-ctrl');

const router = express.Router();

router.post('/book', BookCtrl.createBook);
router.post('/borrow', BookCtrl.createBorrow);
router.put('/book/:id', BookCtrl.updateBook);
router.delete('/book/:id', BookCtrl.deleteBook);
router.get('/book/:id', BookCtrl.getBookById);
router.get('/borrows', BookCtrl.getBorrows);
router.get('/books', BookCtrl.getBooks);


module.exports = router;