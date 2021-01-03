import {addUser, getUser} from '../../services/user.service';
export const SET_USER = 'SET USER'

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const createUser = (user) => {
    return (dispatch) => {
        addUser(user).then(response => {
            if(response.data.success){
                dispatch(setUser(response.data.user));
            }
        })
    }
}

export const enterUser = (email, password) => {
    return (dispatch) => {
        getUser(email,password).then(response => {
            if(response.success){
                console.log(response.data);
                dispatch(setUser(response.data));
            }
        })
    }
}
