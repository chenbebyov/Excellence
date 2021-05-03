import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000/api'
})

export const getAllBooks = () => api.get('/books');
export const getAllBorrows = () => api.get('/borrows');
export const updateBook =(id,book) => api.put(`/book/${id}`, book);
export const addBook = (book) => api.post(`/book`, book);
export const addBorrow = (borrow) => api.post(`/borrow`, borrow);

const apis = {
    getAllBooks,
    updateBook,
    addBook,
    addBorrow,
    getAllBorrows
}


export default apis;