import {addLesson} from '../../services/lesson.service';
import {setMessage} from './message.action';
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
        addLesson(lesson).then(response => {
            if(response.data.success){
                debugger;
                dispatch(setMessage('success'));
            }
        })
    }
}

