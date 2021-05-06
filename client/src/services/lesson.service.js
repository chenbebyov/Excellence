import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000/api'
})

export const addLesson = (lesson, levelsIds) => api.post('/lesson', {lesson,levelsIds});
export const getLessons = () => api.get(`/lessons`).then(response => response.data);

const apis = {
    addLesson,
    getLessons
}

export default apis;