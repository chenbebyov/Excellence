import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:3000/api'
})

export const addNewLayer = (layer) => api.post('/layer', {name: layer});
export const addNewGrade = (params) => api.post('/grade', params);
export const addNewLevel = (params) => api.post('/level', params);
export const addNewGroup = (params) => api.post('/group', params);
export const getUserGroups = (userId) => api.get(`/groups/${userId}`);
export const getAllLayers = () => api.get('/layers');
export const getLayerById = (id) => api.get(`/layer/${id}`);
export const updateGroupDetails = (group) => api.put('/group', group);
export const updateGroupLessons = (group) => api.put('/group/lessons', group);
export const getLessons = (groupId, userId, getAll) => api.get(`/groups/lessons/${groupId}/${userId}/${getAll}`);


const apis = {
    addNewLayer,
    addNewGrade,
    addNewLevel,
    getAllLayers,
    getLayerById,
    addNewGroup,
    updateGroupDetails,
    updateGroupLessons,
    getLessons
}

export default apis;