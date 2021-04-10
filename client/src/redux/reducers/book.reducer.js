import {SET_BOOK} from '../actions/book.actions'

const InitialSatate = {
    book: {},
    loggedIn : false
}

export default function reducer(state = InitialSatate, action){
    switch (action.type) {
        case SET_BOOK:
            return {...state, 
                book : action.payload,
                loggedIn : true
            };
        default:
            return state;
    }
}