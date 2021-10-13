import React, { useEffect, useState, createContext } from 'react'
import { getBooks } from '../../service/DataService'
import Navbar from '../Navbar/Navbar'
import ViewAllBooks from '../ViewAllBooks/ViewAllBooks'
import ViewSingleBookInfo from '../ViewAllBooks/ViewSingleBookInfo'

export const ActionContext = createContext()

function UserHomePage() {
    const [booksInfo, setBooksInfo] = useState([])
    const [openSingleBookInfo, setOpenSingleBookInfo] = useState(false)
    const [singleBook, setSingleBook] = useState([])
    useEffect(() => {
        getBooks()
        .then(res => {
            setBooksInfo(res.data.result)
        })
        .catch(err => console.log(err))
    }, [])

    let listenToViewBookInfo = (openOrNot, bookId) => {
        setOpenSingleBookInfo(openOrNot)
        let book = booksInfo.filter(book => book._id == bookId)
        setSingleBook(book)
    }

    return (
        <div>
            <div className="navbarInUserHome" style={{position:"sticky", top:"0"}}>
                <Navbar name="homePage" listenToViewBookInfo={listenToViewBookInfo} />
            </div>
            <div className="booksCardInUserHome">
            <ActionContext.Provider value={listenToViewBookInfo}>
                {
                    openSingleBookInfo ? <ViewSingleBookInfo singleBook={singleBook} /> : <ViewAllBooks booksInfo={booksInfo} />
                }
            </ActionContext.Provider>
            </div>
        </div>
    )
}

export default UserHomePage
