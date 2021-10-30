import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import MapBooks from './MapBooks'
import { connect } from 'react-redux'
import './ViewAllBooks.css'
import PaginationComp from '../pagination'

function ViewAllBooks(props) {
    const [books, setBooks] = useState([])
    const [booksPerPage] = useState(8)
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState()

    useEffect(() => {
        setLastPage(Math.ceil(props.bookReducer.books.length / booksPerPage))
        setBooks(props.bookReducer.books.slice((currentPage * booksPerPage - booksPerPage), (currentPage * booksPerPage)))
    }, [currentPage])

    const paginateBooks = (pageNumber = 1) => {
        setCurrentPage(pageNumber)
    }
    
    return (
        <React.Fragment>
            <div className="mainContainer allBooksCardMainContainer">
                <div className="innerContainer allBooksCardContainer">
                    <div className="viewAllBookHead">
                        <div className="headText">Books <span className="headTextSpan">({props.bookReducer.books.length} items)</span></div>
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
                            books.map(book => <MapBooks key={book._id} book={book} />)
                        }
                    </div>
                </div>
            </div>
            <PaginationComp lastPage={lastPage} currentPage={currentPage} paginateBooks={paginateBooks} />
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
