const initialState = {
    searchBar : ''
}

const searchBarReducer = (state=initialState, action) => {
    switch(action.type) {
        case "SEARCH_WORD":
            return {
                searchBar: action.payload
            }
        default: return state
    }
}

export default searchBarReducer
