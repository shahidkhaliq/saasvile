import {
    FETCH_BOOKS,
    FETCH_BOOKS_SUCCESS,
    FETCH_RESERVATIONS,
    FETCH_RESERVATIONS_SUCCESS,
} from './actions'

const initialState = {
    books: [ ],
    reservations: [ ],
    isFetchingBooks: false,
    isFetchingReservations: false,
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_BOOKS: {
            return {
                ...state,
                isFetchingBooks: true,
                
            }
        }
        case FETCH_BOOKS_SUCCESS: {
            return {
                ...state,
                books: action.books,
                isFetchingBooks: false,
            }
        }
        case FETCH_RESERVATIONS: {
            return {
                ...state,
                isFetchingReservations: true,
                
            }
        }
        case FETCH_RESERVATIONS_SUCCESS: {
            return {
                ...state,
                reservations: action.reservations,
                isFetchingReservations: false,
            }
        }
        default: {
            return state
        }
    }
}