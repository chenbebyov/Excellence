import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000/api'
})

export const getAllUsers = () => api.get('/users');
export const addUser = (user) => api.post(`/user`, user);

const apis = {
    getAllUsers,
    addUser
}


export default apis;