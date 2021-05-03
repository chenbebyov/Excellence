import {addBook, getAllBooks} from '../../services/book.service'
export const SET_BOOKS = 'SET BOOK'
export const ADD_BOOK = 'ADD BOOK'
export const ADD_BORROW = 'ADD BORROW'

export const setBooks = (books) => {
    return {
        type: SET_BOOKS,
        payload: books
    };
};

export const addNewBook = (book) => {
    return {
        type: ADD_BOOK,
        payload: book
    };
};

export const addNewBorrow = (borrow) => {
    return {
        type: ADD_BORROW,
        payload: borrow
    };
};

export const getBooks = () => {
    return (dispatch) => {
        return getAllBooks()
        .then(response => response.data)
        .then(response => {
            dispatch(setBooks(response.data))
        });
    }
}

export const setNewBook = (book) => {
    return (dispatch) => 
        addBook(book).then(response => response.data).then(data => {
            if(data.success){
                if(data.book != null){
                    dispatch(addNewBook(book));
                }
            }
        });
}

export const setNewBorrow = (borrow) => {
    return (dispatch) => 
        addBorrow(borrow).then(response => response.data).then(data => {
            if(data.success){
                if(data.book != null){
                    dispatch(addNewBorrow(borrow));
                }
            }
        });
}