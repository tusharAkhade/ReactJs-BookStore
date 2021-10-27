import { FETCH_BOOKS_REQUEST, FETCH_BOOKS_FAILURE, FETCH_BOOKS_SUCCESS } from "../actions/bookActionTypes"

const initialState = {
    loading: false,
    books: [],
    error: ''
}

const reducer = (state= initialState, action) => {
    switch(action.type) {
        case FETCH_BOOKS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_BOOKS_SUCCESS:
            return {
                loading: false,
                books: action.payload,
                error: ''
            }
        case FETCH_BOOKS_FAILURE:
            return {
                loading: false,
                books: [],
                error: action.payload
            }
        default: return state
    }
}

export default reducer