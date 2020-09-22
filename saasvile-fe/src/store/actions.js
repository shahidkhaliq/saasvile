import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'
const BOOKS_URL = `${BASE_URL}/books/`
const RESERVATIONS_URL = `${BASE_URL}/reservations/`

export const FETCH_BOOKS = "FETCH_BOOKS"
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS"
export const FETCH_RESERVATIONS = "FETCH_RESERVATIONS"
export const FETCH_RESERVATIONS_SUCCESS = "FETCH_RESERVATIONS_SUCCESS"

export const fetchBooksSuccess = (books) => ({
    type: FETCH_BOOKS_SUCCESS,
    books,
})

export const fetchReservationsSuccess = (reservations) => ({
    type: FETCH_RESERVATIONS_SUCCESS,
    reservations,
})

export const fetchBooks = (query) => {
    let params = query ? `?query=${query}` : ''
    return (dispatch) => {
        axios.get(`${BOOKS_URL}${params}`)
        .then(response => {
            dispatch(fetchBooksSuccess(response.data))
        })
    }
}

export const fetchReservations = () => {
    return (dispatch) => {
        axios.get(RESERVATIONS_URL)
        .then(response => {
            dispatch(fetchReservationsSuccess(response.data))
        })
    }
}

export const createReservation = (bookId, reservedBy) => {
    return (dispatch) => {
        axios.post(RESERVATIONS_URL, {
            book_id: bookId,
            reserved_by: reservedBy,
        })
        .then(_ => {
            dispatch(fetchReservations())
        })
    }
}

export const deleteReservation = (reservationId) => {
    return (dispatch) => {
        axios.delete(`${RESERVATIONS_URL}${reservationId}/`)
        .then(_ => {
            dispatch(fetchReservations())
        })
    }
}