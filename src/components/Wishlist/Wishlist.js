import React, { useState, useEffect } from 'react'
import './Wishlist.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { addToCart, getAddedToCartBooks, getWishListBooks, removeWishListBook } from '../../service/DataService';
import { useHistory } from 'react-router';

function Wishlist() {
    const history = useHistory()
    const [wishListBooks, setWishListBooks] = useState([])
    const [addedToBagBooks, setAddedToBagBooks] = useState([])
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

    const cartBooks = () => {
        getAddedToCartBooks()
            .then(res => {
                setAddedToBagBooks(res.data.result)
                console.log(res.data.result);
            })
    }

    const handleAddToBagClick = (productId) => {
        console.log("handle add to bag");
        addToCart(productId)
        .then(res => {
            handleDeleteWishlistClick(productId)
            history.push('/user-cart')
        })
    }

    useEffect(() => {
        wishlistBook()
        cartBooks()
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
                                <div key={book._id} className="wishlistSingleBookContainer">
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
                                        <div className="wishlistAddToBagBtnContainer">
                                            <div className="wishlistAddToBagBtn" onClick={() => handleAddToBagClick(book.product_id._id)}>Add to bag</div>
                                        </div>
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
