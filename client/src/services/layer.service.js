import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000/api'
})

export const addNewLayer = (layer) => api.post('/layer', {name: layer});
export const addNewGrade = (params) => api.post('/grade', params);
export const addNewLevel = (params) => api.post('/level', params);
export const addNewGroup = (params) => api.post('/group', params);
export const getAllLayers = () => api.get('/layers');
export const getLayerById = (id) => api.get(`/layer/${id}`);
export const updateGroupDetails = (group) => api.put('/group', group);


const apis = {
    addNewLayer,
    addNewGrade,
    addNewLevel,
    getAllLayers,
    getLayerById,
    addNewGroup,
    updateGroupDetails
}

export default apis;