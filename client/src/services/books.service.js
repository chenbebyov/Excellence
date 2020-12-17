import axios from 'axios';

const api = axios.create({
    baseURL: 'http//localhost:3000/api'
})

export const getAllBooks = () => api.get('/books');
export const updateBook =(id,book) => api.put(`/book/${id}`, book);

const apis = {
    getAllBooks,
    updateBook
}


export default apis;