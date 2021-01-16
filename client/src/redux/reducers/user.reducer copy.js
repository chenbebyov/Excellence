import {SET_USER, LOGOUT} from '../actions/user.actions'

const InitialSatate = {
    user: {},
    loggedIn : false
}

export default function reducer(state = InitialSatate, action){
    switch (action.type) {
        case SET_USER:
            return {...state, 
                user : action.payload,
                loggedIn : true
            };
        case LOGOUT: 
            return {
                ...state,
                user : null,
                loggedIn : false
            }
    
        default:
            return state;
    }
}