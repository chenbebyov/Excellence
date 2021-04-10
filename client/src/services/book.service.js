import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000/api'
})

export const getAllBooks = () => api.get('/books');
export const updateBook =(id,book) => api.put(`/book/${id}`, book);
export const addBook = (book) => api.post(`/book`, book);



const apis = {
    getAllBooks,
    updateBook,
    addBook
}


export default apis;