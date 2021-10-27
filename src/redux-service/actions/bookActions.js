import { getBooks } from "../../service/DataService"
import { FETCH_BOOKS_FAILURE, FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS } from "./bookActionTypes"

export const fetchBooksRequest = () => {
    return {
        type: FETCH_BOOKS_REQUEST
    }
}

export const fetchBooksSuccess = (books) => {
    return {
        type: FETCH_BOOKS_SUCCESS,
        payload: books
    }
}

export const fetchBooksFailure = (error) => {
    return {
        type: FETCH_BOOKS_FAILURE, 
        payload: error
    }
}

export const fetchBooks = () => {
    return (dispatch) => {
        dispatch(fetchBooksRequest())
        getBooks()
            .then((response) => {
                const books = response.data.result
                dispatch(fetchBooksSuccess(books))
            })
            .catch(error => {
                dispatch(fetchBooksFailure(error))
            })
    }
}


