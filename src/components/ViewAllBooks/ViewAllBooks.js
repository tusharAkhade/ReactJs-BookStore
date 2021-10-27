import React from 'react'
import Footer from '../Footer/Footer'
import MapBooks from './MapBooks'
import { connect } from 'react-redux'
import './ViewAllBooks.css'

function ViewAllBooks(props) {
    return (
        <React.Fragment>
            <div className="mainContainer allBooksCardMainContainer">
                <div className="innerContainer allBooksCardContainer">
                    <div className="viewAllBookHead">
                        <div className="headText">Books <span className="headTextSpan">(128 items)</span></div>
                        <div className="selectionOfSort">
                            <select name="sortBy" id="sortBy">
                                <option value="SortByRelevance">Sort by relevance</option>
                                <option value="SortByName">Sort by name</option>
                                <option value="SortByPrice">Sort By price</option>
                            </select>
                        </div>
                    </div>
                    <div className="allBooksCard">
                        {
                            props.bookReducer.books.map(book => <MapBooks book={book} />)
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    // console.log(state)
    return {
        bookReducer: state.bookReducer
    }
}

export default connect(mapStateToProps)(ViewAllBooks)
