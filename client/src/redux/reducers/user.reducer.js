import {SET_NAME} from '../actions/user.actions'

const InitialSatate = {
    user: {'name': 'test'}
}

export default function reducer(state = InitialSatate, action){
    switch (action.type) {
        case SET_NAME:
            return {...state, user : {name: action.payload}};
    
        default:
            return state;
    }
}