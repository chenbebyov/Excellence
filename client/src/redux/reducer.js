import {SET_NAME} from './action'

const InitialSatate = {
    user: {'name': 'test'},
    books: []
}

export default function reducer(state = InitialSatate ,action){
    switch (action.type) {
        case SET_NAME:
            return {...state, user : {name: action.payload}};
    
        default:
            return state;
    }
}