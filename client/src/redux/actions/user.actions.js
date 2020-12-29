import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000/api'
})

export const SET_NAME = 'SET NAME'

export const setUserName = (newUserName) => {
    return {
        type: SET_NAME,
        payload: newUserName
    };
};

export const createUser = (user) => api.post('/user',user).then(response => {
    if(response.success){
        setUserName(response.user);
    }
});

