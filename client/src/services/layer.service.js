import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000/api'
})

export const getAllUsers = () => api.get('/users');
export const addUser = (user) => api.post('/user', user);
export const getUser = (email,password) => api.get(`/user/${email}/${password}`).then(response => response.data);

const apis = {
  
}

export default apis;