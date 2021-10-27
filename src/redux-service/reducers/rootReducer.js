import { combineReducers }  from 'redux'
import bookReducer from './bookReducer'

const rootReducer = combineReducers({
    bookReducer: bookReducer
})

export default rootReducer
