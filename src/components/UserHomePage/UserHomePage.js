import React, { useEffect, useState, createContext } from 'react'
import { getBooks } from '../../service/DataService'
import { connect } from 'react-redux'
import { fetchBooks } from '../../redux-service/actions/bookActions'
import Navbar from '../Navbar/Navbar'
import ViewAllBooks from '../ViewAllBooks/ViewAllBooks'
import ViewSingleBookInfo from '../ViewAllBooks/ViewSingleBookInfo'

export const ActionContext = createContext()

function UserHomePage(props) {
    const [openSingleBookInfo, setOpenSingleBookInfo] = useState(false)
    const [singleBook, setSingleBook] = useState([])

    useEffect(() => {
        props.fetchBooks()
    }, [])

    let listenToViewBookInfo = (openOrNot, bookId) => {
        setOpenSingleBookInfo(openOrNot)
        let book = props.bookReducer.books.filter(book => book._id == bookId)
        setSingleBook(book)
    }

    return (
        <div>
            <div className="navbarInUserHome" style={{ position: "sticky", zIndex: "2", top: "0" }}>
                <Navbar name="homePage" listenToViewBookInfo={listenToViewBookInfo} />
            </div>
            <div className="booksCardInUserHome">
                {
                    props.bookReducer.loading ?
                        (<h1>Loading</h1>)
                        :
                        (
                            <ActionContext.Provider value={listenToViewBookInfo}>
                                {
                                    openSingleBookInfo ? <ViewSingleBookInfo singleBook={singleBook} /> : <ViewAllBooks />
                                }
                            </ActionContext.Provider>
                        )
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    // console.log(state)
    return {
        bookReducer: state.bookReducer
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchBooks: () => dispatch(fetchBooks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage)
