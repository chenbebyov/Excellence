import {addLesson} from '../../services/lesson.service';
export const SET_USER = 'SET USER'
export const LOGOUT = 'LOGOUT'

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const createLesson = (lesson) => {
    return (dispatch) => {
        return addLesson(lesson)
            .then(response => response.data)
            .catch(error => ({success:false , error: error}));
    }
}