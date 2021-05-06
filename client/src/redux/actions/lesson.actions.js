import { getAllLayers } from '../../services/layer.service';
import {addLesson,getLessons} from '../../services/lesson.service';
export const SET_USER = 'SET USER'
export const LOGOUT = 'LOGOUT'
export const SET_LESSONS = 'SET LESSONS'

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const setLessons = (lessons) => {
    return {
        type: SET_LESSONS,
        payload: lessons
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const createLesson = (lesson, levelsIds) => {
    return (dispatch) => {
        return addLesson(lesson, levelsIds)
            .then(response => response.data)
            .catch(error => ({success:false , error: error}));
    }
}

export const getAllLessns=()=>{
    return (dispatch) => {
        getLessons().then(response => response.data).then(response => {
            if(response.success){
                dispatch(setLessons(response.data));
            }
        })
    }
}
