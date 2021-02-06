import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000/api'
})

export const addNewLayer = (layer) => api.post('/layer', layer);
export const getAllLayers = () => api.get('/layers');
export const getLayerById = (id) => api.get(`/layer/${id}`);

const apis = {
    addNewLayer,
    getAllLayers,
    getLayerById
}

export default apis;