import {SET_USER} from '../actions/user.actions'

const InitialSatate = {
    user: {'name': 'test'}
}

export default function reducer(state = InitialSatate, action){
    switch (action.type) {
        case SET_USER:
            return {...state, user : action.payload};
    
        default:
            return state;
    }
}