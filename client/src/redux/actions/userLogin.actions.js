import {addUser} from '../../services/user.service';
export const SET_USER = 'SET USER'

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const enterUser = (user) => {
    return (dispatch) => {
        getDetails(email,password).then(response => {
            if(response.data.success){
                dispatch(setUser(response.data.user));
            }
        })
    }
}