import {SET_BOOKS, ADD_BOOK} from '../actions/book.actions'

const InitialSatate = {
    books: null
}

export default function reducer(state = InitialSatate, action){
    switch (action.type) {
        case SET_BOOKS:
            return {...state, 
                books : action.payload,
            };
        case ADD_BOOK: 
            return {...state,
                books: [...state.books, action.payload]
            }
        default:
            return state;
    }
}