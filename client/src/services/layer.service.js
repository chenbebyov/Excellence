import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000/api'
})

export const addLayer = (layer) => api.post('/layer', layer);
export const getAllLayers = () => api.get('/layers');
export const getLayerById = (id) => api.get(`/layer/${id}`);

const apis = {
    addLayer,
    getAllLayers,
    getLayerById
}

export default apis;