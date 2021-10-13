import React from 'react'
import Footer from '../Footer/Footer'
import MapBooks from './MapBooks'
import './ViewAllBooks.css'

function ViewAllBooks(props) {
    const { booksInfo } = props
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
                            booksInfo.map(book => <MapBooks book={book} />)
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default ViewAllBooks
