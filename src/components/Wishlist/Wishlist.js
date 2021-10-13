import React, { useState, useEffect } from 'react'
import './Wishlist.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { getWishListBooks, removeWishListBook } from '../../service/DataService';

function Wishlist() {
    const [wishListBooks, setWishListBooks] = useState([])
    const [bookQuantity, setBookQuantity] = useState(0)

    const wishlistBook = () => {
        getWishListBooks()
            .then(res => {
                console.log(res.data.result)
                setWishListBooks(res.data.result)
            })
    }

    const handleDeleteWishlistClick = (productId) => {
        removeWishListBook(productId)
            .then(res => {
                console.log(res)
                wishlistBook()
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        wishlistBook()
    }, [])
    return (
        <div>
            <Navbar />
            <div className="wishlistOuterContainer">
                <div className="wishlistContainer">
                    <div className="wishlistHeading">My WishList ({wishListBooks.length})</div>
                    <div className="wishlistAllBooksContainer">
                        {
                            wishListBooks.map(book =>
                                <div className="wishlistSingleBookContainer">
                                    <div className="wishlistImgAndInfoContainer">
                                        <div className="wishlistBookImgContainer">
                                            <div className="wishlistBookImg"></div>
                                        </div>
                                        <div className="wishlistBookInfoContainer">
                                            <div className="wishlistBookName"> {book.product_id.bookName} </div>
                                            <div className="wishlistBookAuthor">by {book.product_id.author} </div>
                                            <div className="wishlistBookPriceContainer">
                                                <div className="wishlistBookNewPrice">Rs. {book.product_id.discountPrice} </div>
                                                <div className="wishlistBookOldPrice">Rs. {book.product_id.price} </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wishlistButtonsContainer">
                                        {
                                            bookQuantity >= 0 ?
                                                <div className="wishlistCounterButtons">
                                                    <div className="wishlistSubtractQuantityBtn"> <RemoveOutlinedIcon style={{ width: "100%", height: "100%", color: "#DBDBDB", }} /> </div>
                                                    <div className="wishlistQuantityDisplay"> 5 </div>
                                                    <div className="wishlistAddQuantityBtn"> <AddOutlinedIcon style={{ width: "100%", height: "100%", color: "#333232", }} /> </div>
                                                </div>
                                                :
                                                <div className="wishlistAddToBagBtnContainer">
                                                <div className="wishlistAddToBagBtn">Add to bag</div>
                                                </div>
                                        }
                                        <div className="removeFromWishlistBtn" onClick={() => handleDeleteWishlistClick(book.product_id._id)} > <DeleteOutlineOutlinedIcon style={{ width: "100%", height: "100%", }} /> </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Wishlist
