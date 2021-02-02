export const SET_LAYERS = 'SET LAYERS'

export const setLayers = (layersList) => {
    return {
        type: SET_LAYERS,
        payload: layersList
    };
};

/*
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
        setRole(userId, role).then(response => {
            if(response.success){
                //dispatch(setUser(response.data.user));
                dispatch(setMessage(response.message));
            }
        })
    }
}

export const enterUser = (email, password) => (dispatch) => {
    return getUser(email, password).then(response => {
        if (response.success) {
            dispatch(setUser(response.data.user));
            localStorage.setItem('access-token', response.data.accessToken);
            return Promise.resolve();
        }
    }).catch(error => {
         // const message = (response.error)
            dispatch(setMessage(error.response.data.error));
            return Promise.reject();
    })
}

*/