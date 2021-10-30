import { combineReducers }  from 'redux'
import bookReducer from './bookReducer'
import searchBarReducer from './searchBarReducer'

const rootReducer = combineReducers({
    bookReducer: bookReducer,
    searchBarReducer
})

export default rootReducer
