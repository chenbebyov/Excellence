const express = require('express');

const BookCtrl = require('../controllers/book-ctrl');

const router = express.Router();

router.post('/book', BookCtrl.createBook);
router.post('/borrow/add', BookCtrl.createBorrow);
router.put('/book/:id', BookCtrl.updateBook);
router.delete('/book/:id', BookCtrl.deleteBook);
router.get('/book/:id', BookCtrl.getBookById);
router.get('/books', BookCtrl.getBooks);
router.get('/borrows', BookCtrl.getBorrows);
router.get('/books', BookCtrl.getBooks);
router.post('/borrow/return', BookCtrl.returnBorrow);


module.exports = router;