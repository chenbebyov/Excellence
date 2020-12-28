export const SET_NAME = 'SET NAME'

export const setUserName = (newUserName) => {
    return {
        type: SET_NAME,
        payload: newUserName
    };
};

