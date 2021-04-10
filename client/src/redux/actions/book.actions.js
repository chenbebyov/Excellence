import {addBook} from '../../services/book.service'
export const SET_BOOK = 'SET BOOK'

export const setBook = (book) => {
    return {
        type: SET_BOOK,
        payload: book
    };
};

export const setNewBook = (book) => {
    return (dispatch) => {
        return addBook(book);
    }
}