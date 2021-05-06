import {SET_USER, LOGOUT} from '../actions/user.actions'

const InitialSatate = {
    user: null,
}

export default function reducer(state = InitialSatate, action){
    switch (action.type) {
        case SET_USER:
            return {...state, 
                user : action.payload,
            };
        case LOGOUT: 
            return {
                ...state,
                user : null,
            }
    
        default:
            return state;
    }
}