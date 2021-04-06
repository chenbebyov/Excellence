import {addUser, getUser, setRole} from '../../services/user.service';
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

export const createUser = (user) => {
    return (dispatch) => {
        addUser(user).then(response => {
            if(response.data.success){
                dispatch(setUser(response.data.user));
            }
        })
    }
}
export const setUserRole = (userId, role) => {
    return (dispatch) => {
        return setRole(userId, role);
    }
}

export const enterUser = (email, password) => (dispatch) => {
    return getUser(email, password).then(response => {
        if (response.success) {
            dispatch(setUser(response.data.user));
            localStorage.setItem('access-token', response.data.accessToken);
        }
        return response;
    }).catch(error => error)
}

